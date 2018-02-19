DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Tom Nook', 'Amiibo', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Isabelle', 'Amiibo', 4.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: KK Slider', 'Amiibo', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Kicks', 'Amiibo', 4.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Amiibo ACNL: Resetti', 'Amiibo', 7.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pandemic', 'Board Games', 24.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dead of Winter', 'Board Games', 45.99, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mice and Mystics', 'Board Games', 45.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Patchwork', 'Board Games', 24.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Firefly: The Game', 'Board Games', 49.99, 50);

