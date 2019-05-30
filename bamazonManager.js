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
//declaring the variable id and unit globaly to use them any where in the functions
var id, unit;
// asks the manager what to do
inq()

function view() {
    connection.query('SELECT * FROM products', function(error, results, fields) {
        if (error) throw error;
        results.forEach(element => {
            console.log(`Available item are:`, element);

        });
        console.log("***********************************************");
    })
}

function inq() {
    inquirer
        .prompt({
                type: 'list',
                name: 'theme',
                message: 'What do you want to do manager?',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }


        )
        .then(answers => {
            switch (answers.theme) {
                case 'View Products for Sale':
                    view()
                    break;
                case 'View Low Inventory':
                    viewlow()
                    break;
                case 'Add to Inventory':
                    additem()
                    break;
                case 'Add New Product':
                    addnew()
                    break;

            }
        })
}


function additem() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "What's the product name?"
            },
            {
                type: 'input',
                name: 'dpname',
                message: "on what department do you want to add it?",

            },
            {
                type: 'input',
                name: 'price',
                message: "What is the price of one item?",

            },
            {
                type: 'input',
                name: 'quantity',
                message: "how many number of items?",

            }
        ])
        .then(answers => {
            connection.query(`INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES(?,?,?,?)`, [answers.name, answers.dpname, answers.price, answers.quantity], function(err, res, fields) {
                if (err) throw err;
                //console.log(res[0].price, res[0].stock_quantity)
                console.log("New items added");

            })

        })

}

function delet(id, unit) {
    connection.query('DELETE FROM products WHERE sku=?', [id], function(err, res, fields) {
        if (err) throw err;
        console.log(res.affectedRows + "products deleted")
    })
    connection.end();
}

function domore() {

}