// load environment
require("dotenv").config();

// load mysql login info
let db = require("./mysql.js");
//console.log(db.login)

// start mysql connection
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
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
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    console.log("---------- Welcome to Bamazon! ----------");
    connection.query("SELECT * from products", function(error, results, fields) {
        console.log("Available products: ");
        console.log("Item ID\tProduct Name\tPrice ($)");
        results.forEach(rawdata => {
            console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price);
        });
    })
    connection.end();
}
  
  