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

connection.connect(function (err) {
    if (err) throw err;
    console.log("****------Welcome to the manager page-------****");

    // start the manager backend
    start();
});

function start() {
    // start the inquiry of manager acitivity list
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
            // View all the products for sale
            case "View products for sale":
                try {
                    connection.query("SELECT * from products", function (error, results, fields) {
                        if (error) throw error;
    
                        console.log("Available products: ");
                        console.log("Item ID\tProduct Name\tPrice ($)\tQuantity");
    
                        results.forEach(rawdata => {
                            console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price + '\t' + rawdata.stock_quantity);
                        });
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    connection.end();   // end connection no matter what
                }

                break;
            // View products that inventory is less than 5
            case "View low inventory":
                try {
                    connection.query("SELECT * from products where stock_quantity < 5", function (error, results, fields) {
                        if (error) throw error;
                        if (0 === results.length) {
                            console.log("No low inventory items");
                        } else {
                            console.log("Available products: ");
                            console.log("Item ID\tProduct Name\tPrice ($)\tQuantity");
    
                            results.forEach(rawdata => {
                                console.log(rawdata.item_id + '\t' + rawdata.product_name + '\t' + rawdata.price + '\t' + rawdata.stock_quantity);
                            });
                        }
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    connection.end();   // end connection no matter what
                }

                break;
            // Add inventory to existing products
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
                ]).then(function (answer) {
                    try {
                        if (isNaN(answer.addQuantity)) throw "Need a number for quantity!"
                        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?",
                            [parseInt(answer.addQuantity), answer.productName],
                            function (error, results, fields) {
                                if (error) throw error;
                                if (0 === results.changedRows) {
                                    console.log("The product " + answer.productName + " is not in inventory")
                                } else {
                                    console.log("The inventory is updated.");
                                }
                            });
                    } catch (e) {
                        console.log(e);
                    } finally {
                        connection.end();       // end connection no matter what
                    }
                })
                break;
            // Add a new product
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
                ]).then(function (answer) {
                    try {
                        if (isNaN(answer.price)) throw "Price needs to be a number!";
                        if (isNaN(answer.quantity)) throw "Quantity needs to be a number!";
                        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)",
                        [answer.name, answer.dptmt, answer.price, answer.quantity],
                        function (error, results, fields) {
                            if (error) throw error;
                            console.log("The new product is added to the inventory");
                        });
                    } catch (error) {
                        console.log(error);
                    } finally {
                        connection.end();       // end connection no matter what
                    }
                })
                break;
        }
    })
}