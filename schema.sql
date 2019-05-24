/*schema for sql database/table*/
DROP DATABASE IF EXISTS bamazon;
/*create databse*/
CREATE DATABASE bamazon;
USE bamazon;
/*Create table with primary key */
CREATE TABLE products(
    sku INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INT(10),
    stock_quantity INT(15)
);