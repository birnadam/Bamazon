// packages to use
var mysql = require("mysql");
var inquirer = require("inquirer");

// connecting with MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
});

connection.connect(function(err){
    if (err) throw err;
});

// function to show products table
var display = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
    })
};

// function for user to purchase and make changes 
var run = function() {

    // query the database to show available products to buy
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        // prompt the user for what they'd like to buy and how much
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What product would you like to buy?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function(answer) {
            var chosenProduct;
            var totalCost;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    chosenProduct = results[i];
                }
            }
            if (chosenProduct.stock_quantity > parseInt(answer.amount)) {
                connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: chosenProduct.stock_quantity - parseInt(answer.amount)
                },
                {
                    id: chosenProduct.id
                }], function(error) {
                    if (error) throw err;
                    console.log("\n");
                    console.log("******************************");
                    console.log("*Product bought successfully!*");
                    console.log("******************************");
                    console.log("Purchase Summary");
                    console.log("-----------------------------*");
                    console.log("Item: " +  chosenProduct.product_name);
                    console.log("Quantity: " + parseInt(answer.amount));
                    console.log("-----------------------------*");
                    totalCost = chosenProduct.price * parseInt(answer.amount);
                    console.log("Total cost: " + "$" + totalCost);
                    console.log("******************************");
                    console.log("\n");
                });

                // query the database to select from departments table
                connection.query("SELECT * FROM Departments", function(err, deptRes){
                    if(err) throw err;
                    var index;
                    for(var i = 0; i < deptRes.length; i++){
                        if(deptRes[i].department_name === chosenProduct.department_name){
                            index = i;
                        }
                    }
                    
                    // updates product sales 
                    connection.query("UPDATE Departments SET ? WHERE ?", [
                        {product_sales: deptRes[index].product_sales + totalCost},
                        {department_name: chosenProduct.department_name}
                    ], function(err){
                        if(err) throw err;
                        console.log("Department Sales Updated.");

                        // see whether or not the user wants to purchase something else
                        rerun();
                    })
                })      
            } else {
                console.log("******************************");
                console.log("*   Insufficient quantity!   *");
                console.log("******************************");

                // see whether or not the user wants to purchase something else
                rerun();
            }
        });
    });
};

// function to either restart to purchase more or stop
var rerun = function() {
    // confirm whether or not the user wants to buy anything else
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            default: true,
            message: "\n Would you like to buy more?\n"
        }
    ]).then(function(answer) {

        // if true, rerun the app
        if (answer.continue) {
            display();
            run();
        
        // stop otherwise
        } else {
            console.log("******************************");
            console.log("*      Purchasing ended!     *");
            console.log("******************************");
        }
    })
};

// call the functions to start the app
display();
run();