DROP DATABASE IF EXISTS bamazonDB;

-- Create a database called bamazon
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NULL,
    department_name VARCHAR(255) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Kindle", "Electronics", 199.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Bose Speaker", "Electronics", 89.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Dyson Air Multiplier", "Home & Kitchen", 189.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Instant Pot", "Home & Kitchen", 89.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Yamaha Electric Violin", "Music Instrument", 600.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hot Air Brush", "Beauty & Personal Care", 600.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lego Model", "Toy", 50.34, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Alienware PC", "Computer", 1388.88, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Scooter", "Sports & Outdoors", 459.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Ring doorbell", "Electronics", 100.00, 20);