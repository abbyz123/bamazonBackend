// load environment
require("dotenv").config();

// load mysql login info
let db = require("./mysql.js");
//console.log(db.login)

// start mysql connection
let mysql = require("mysql");
let inquirer = require("inquirer");
let promise = require("promise");

// create the connection information for the sql database
let connection = mysql.createConnection({
    // host name
    host: db.login.host,

    // port
    port: parseInt(db.login.port),

    // username
    user: db.login.user,

    // password
    password: db.login.password,

    // db
    database: db.login.db
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

async function start() {
    // Welcome message
    console.log("---------- Welcome to Bamazon! ----------");

    // Show all the items
    connection.query("SELECT * from products", function (error, results, fields) {
        if (error) throw error;
        
        console.log("Available products: ");
        console.log("Item ID\tProduct Name\tPrice ($)\tQuantity");

        results.forEach(rawdata => {
            console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price  + '\t' + rawdata.stock_quantity);
        });

        // input prompt
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the item id to purchase:"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity of the purchasing item:"
            }
        ]).then(function (answer) {
            idQuery = "SELECT * from products where item_id = " + mysql.escape(answer.id);
            connection.query(idQuery, function(error, results, fields) {
                if (error) throw error;
                // end the process if the item does not exist
                if (0 === results.length) {
                    console.log("item is not found.");
                    connection.end();
                    process.exit(1);
                }

                // end the process if the request quantity exceeds the in stock amount
                let quantity = parseInt(answer.quantity);
                if (quantity > results[0].stock_quantity) {
                    console.log("Insufficient quantity.")
                    connection.end();
                    process.exit(1);
                }

                // new stock quanity and the total cost
                let newQuantity = results[0].stock_quantity - quantity;
                let totalCost = Number(quantity * results[0].price).toFixed(2);     // show only two decimal
                
                // update db query
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, answer.id], function(error, results, fields) {
                    if (error) throw error;
                    console.log("Thank you. Your order has been placed.");
                    console.log("Your total cost is: " + totalCost + " dollars");
                    connection.end();
                })
            });
        })
    });
}

