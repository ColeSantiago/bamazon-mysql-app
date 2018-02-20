DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	product_sales DECIMAL(10, 2) NOT NULL,
	PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(45) NOT NULL,
	over_head_costs INT,
	PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Tom Nook', 'Toys', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Isabelle', 'Toys', 4.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: KK Slider', 'Toys', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Kicks', 'Toys', 4.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Resetti', 'Toys', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pandemic', 'Games', 24.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dead of Winter', 'Games', 45.99, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mice and Mystics', 'Games', 45.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Patchwork', 'Games', 24.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Firefly: The Game', 'Games', 49.99, 50);

-- ------------------------------------------------------------------------

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Toys', 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Games', 3000);
