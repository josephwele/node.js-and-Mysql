//dependencies 
const express = require("express");
const inquirer = require("inquirer")
const mysql = require("mysql");
//create express intance
const app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gondermylife12',
    database: 'bamazon'
});
connection.connect();

connection.query('SELECT * FROM products', function(error, results, fields) {
    if (error) throw error;
    results.forEach(element => {
        console.log(`Available item are:`, element);
    });
    inquirer
        .prompt([{
                type: 'input',
                name: 'sku',
                message: "what is thee SKU of the product that you would like to buy"
            },
            {
                type: 'input',
                name: 'unit',
                message: "'how many units of the product you would like to buy'"

            }
        ])

});



connection.end();