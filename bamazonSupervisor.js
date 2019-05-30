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
inq();

function inq() {
    inquirer
        .prompt({
                type: 'list',
                name: 'theme',
                message: 'What do you want to do supervisor?',
                choices: [
                    "View Product Sales by Department",
                    "Create New Department"
                ]
            }


        )
        .then(answers => {
            if (answers.theme === "View Product Sales by Department") view();
            else
                create();


        })
}

function view() {
    var query = 'SELECT departments.department_id,departments.department_name,departments.over_head_cost,products.products_sales FROM departments left join products on departments.department_name=products.department_name'
    connection.query(query, function(err, res) {
        if (err) throw err
        else
            console.log(res);
    })
}