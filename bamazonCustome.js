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
var id, unit;

connection.query('SELECT * FROM products', function(error, results, fields) {
    if (error) throw error;
    results.forEach(element => {
        console.log(`Available item are:`, element);
    });
    inq();

});

function inq() {
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
        .then(answers => {
            id = answers.sku;
            unit = answers.unit;
            update(id, unit)
                //delet(id, unit);

        })
}

function update(id, unit) {
    connection.query(`UPDATE products SET stock_quantity=? WHERE sku=?`, [
        unit,
        id
    ], function(err, res, fields) {
        if (err) throw err;
        console.log(res.affectedRows + ' products updated!\n')
    })

    connection.end();
}

function delet(id, unit) {
    connection.query('DELETE FROM products WHERE sku=?', [id], function(err, res, fields) {
        if (err) throw err;
        console.log(res.affectedRows + "products deleted")
    })
    connection.end();
}