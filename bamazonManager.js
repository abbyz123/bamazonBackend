require("dotenv").config();

let db = require("./mysql.js");

let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: db.login.host,
    port: parseInt(db.login.port),
    user: db.login.user,
    password: db.login.password,
    database: db.login.db
})

connection.connect(async function (err) {
    if (err) throw err;
    await console.log("****------Welcome to the manager page-------**");
    start();
});

function start() {
    // console.log("****------Welcome to the manager page-------**");
    inquirer.prompt([
        {
            name: "managerList",
            type: "rawlist",
            message: "Select an activity: ",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"
            ]
        }
    ]).then(function (answer) {
        switch (answer.managerList) {
            case "View products for sale":
                connection.query("SELECT * from products", function (error, results, fields) {
                    if (error) throw error;

                    console.log("Available products: ");
                    console.log("Item ID\tProduct Name\tPrice ($)\tQuantity");

                    results.forEach(rawdata => {
                        console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price + '\t' + rawdata.stock_quantity);
                    });

                    connection.end();
                });
                break;
            case "View low inventory":
                connection.query("SELECT * from products where stock_quantity < 5", function (error, results, fields) {
                    if (error) throw error;
                    if (0 === results.length) {
                        console.log("No low inventory items");
                        connection.end();
                    } else {
                        console.log("Available products: ");
                        console.log("Item ID\tProduct Name\tPrice ($)\tQuantity");

                        results.forEach(rawdata => {
                            console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price + '\t' + rawdata.stock_quantity);
                        });
                        connection.end();
                    }
                });
                break;
            case "Add to inventory":
                inquirer.prompt([
                    {
                        name: "productName",
                        type: "input",
                        message: "Which product you want to add inventory?"
                    },
                    {
                        name: "addQuantity",
                        type: "input",
                        message: "How many do you want to add?"
                    }
                ]).then(function(answer) {
                    console.log(answer);
                    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?",
                                     [parseInt(answer.addQuantity), answer.productName], 
                                     function(error, results, fields) {
                                         if (error) throw error;
                                         console.log(results);
                                         console.log("The inventory is updated.");
                                     });
                    connection.end();
                })
                break;
            case "Add new product":
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "What is the new product name?"
                    },
                    {
                        name: "dptmt",
                        type: "input",
                        message: "What is the new product department?"
                    },
                    {
                        name: "price",
                        type: "input",
                        message: "What is the price of the new product?"
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "What is the quantity added to inventory?"
                    }
                ]).then(function(answer) {
                    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)",
                                     [answer.name, answer.dptmt, answer.price, answer.quantity],
                                     function(error, results, fields) {
                                         if (error) throw error;
                                         console.log(results);
                                         console.log("The new product is added to the inventory");
                                     });
                    connection.end();
                })
                break;
        }
    })
}