// packages needed
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

// connecting with MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
});

// function which prompts the user and then runs a function depending on their choice
function run(){
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(ans){
        switch(ans.action){
        case "View Products for Sale": viewProducts();
        break;
        case "View Low Inventory": viewLowInventory();
        break;
        case "Add to Inventory": addToInventory();
        break;
        case "Add New Product": addNewProduct();
        }
    });
}

// function for user to view available products in the store
function viewProducts(){
    console.log("******************************");
    console.log("*      Viewing Products      *");
    console.log("******************************");
  
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
        rerun();
    });
}
  
// function showing user all products that have quantity less than 5
function viewLowInventory(){
    console.log("******************************");
    console.log("*    Viewing Low Inventory   *");
    console.log("******************************");
  
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        console.table(results);
        rerun();
    });
}
  
// function allowing user to add inventory to an existing product
function addToInventory(){
    console.log("******************************");
    console.log("*     Adding to Inventory    *");
    console.log("******************************");
  
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        var itemArray = [];
        // pushes each item into an itemArray
        for(var i=0; i<res.length; i++){
            itemArray.push(res[i].product_name);
        }
  
        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemArray,
            message: "Which item would you like to add inventory?"
        }, {
            type: "input",
            name: "qty",
            message: "How much would you like to add?",
            validate: function(value){
                if(isNaN(value) === false){return true;}
                else{return false;}
            }
        }]).then(function(ans){
            var currentQty;
            for(var i=0; i<res.length; i++){
                if(res[i].product_name === ans.product){
                    currentQty = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE products SET ? WHERE ?', [
                {stock_quantity: currentQty + parseInt(ans.qty)},
                {product_name: ans.product}
            ], function(err){
                if(err) throw err;
                console.log('Quantity updated.');
                rerun();
            });
        })
    });
}

// function to add a new product to the store
function addNewProduct(){
    console.log("******************************");
    console.log("*     Adding New Product     *");
    console.log("******************************");

    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "Type in your new product: ",
        validate: function(value){
            if(value){return true;}
            else{return false;}
        }
    }, {
        type: "input",
        name: "department",
        message: "Type in the appropriate department: ",    
        validate: function(value){
            if(value){return true;}
            else{return false;}
        }
    }, {
        type: "input",
        name: "price",
        message: "Type in price of your product: ",
        validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
        }
    }, {
        type: "input",
        name: "quantity",
        message: "Type in the stock available: ",
        validate: function(value){
            if(isNaN(value) == false){return true;}
            else{return false;}
        }
    }]).then(function(ans){
        connection.query('INSERT INTO products SET ?',{
            product_name: ans.product,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity
        }, function(err){
            if(err) throw err;
            console.log('New item added.');
            rerun();
        })
    });
}

// function to check whether or not the user wants to see the options again
function rerun(){
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            default: true,
            message: "Would you like to see the options again?"
        }
    ]).then(function(answer) {

        // if true, rerun the app
        if (answer.continue) {
            run();
        
        // stop otherwise
        } else {
            console.log("******************************");
            console.log("*  Session Ended. Good Bye!  *");
            console.log("******************************");
        }
    })
}

// run the app
run();