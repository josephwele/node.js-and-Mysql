//dependencies 
const express = require("express");
const inquirer = require("inquirer")
const mysql = require("mysql");
//create express intance
const app = express();
//creates connection 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gondermylife12',
    database: 'bamazon'
});
connection.connect();
//declaring the variable id and unit globaly to use them any where in the functions
var id, unit;
//selects all products to display to user
connection.query('SELECT * FROM products', function(error, results, fields) {
    // error handler
    if (error) throw error;
    //console log each element using forEach loop
    results.forEach(element => {
        console.log(`Available item are:`, element);

    });
    console.log("***********************************************");
    //calls inquirer 
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
            //graps the id and unit from the response answers
            id = answers.sku;
            unit = answers.unit;
            // uses id and unit as an argument
            update(id, unit)

        })
}

function update(id, unit) {
    connection.query(`SELECT * FROM products WHERE sku=?`, [
        id
    ], function(err, res, fields) {
        if (err) throw err;
        //console.log(res[0].price, res[0].stock_quantity)
        if (res[0].stock_quantity - unit >= 0) {
            connection.query('UPDATE products set stock_quantity=? WHERE sku=?', [res[0].stock_quantity - unit, id],
                function(err, results) {
                    if (err) throw err;

                })
            console.log("***********************************************");
            console.log(`Your total cost is:${(res[0].price)*unit}`);
            connection.query('UPDATE products set products_sales=? WHERE sku=?', [res[0].price * unit, id],
                function(err, results) {
                    if (err) throw err;
                    console.log(`products_sales column updated`)
                    console.log("***********************************************");
                })
        } else
            console.log(`insufficient quantity:
        avalaible stocks are ${res[0].stock_quantity}`);
    })
}

function delet(id, unit) {
    //delets products with the specified sku
    connection.query('DELETE FROM products WHERE sku=?', [id], function(err, res, fields) {
        if (err) throw err;
        console.log(res.affectedRows + "products deleted")
    })
    connection.end();
}