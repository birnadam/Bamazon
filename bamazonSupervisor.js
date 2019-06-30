// packages needed
var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

// connecting to MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
})

// prompt user to select an action to run
function run(){
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(ans){
        switch(ans.action){
        case "View Product Sales by Department": viewSalesByDept();
        break;
        case "Create New Department": createNewDept();
        }
    });
}

// displays product sales table from departments
function viewSalesByDept(){
    console.log("******************************");
    console.log("* Product Sales By Department*");
    console.log("******************************");

    connection.query('SELECT * FROM departments', function(err, res){
        if(err) throw err;
        
        // empty array to store table contents
        var values = [] ;
        for(var i = 0; i<res.length;i++){
            var resArr = [res[i].department_id, res[i].department_name, (res[i].over_head_costs).toFixed(2), (res[i].product_sales).toFixed(2), (res[i].product_sales - res[i].over_head_costs).toFixed(2)];
            
            // looping through the data and push the values into the array
            values = values.concat([resArr]);
        }
        
        // console.table performs as we need, first parameter being headers for the table, second parameter being the rows underneath 
        console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], values);

        // confirm whether or not the user wants to see the options again
        rerun();
    })
}

// creates new department
function createNewDept(){
    console.log("******************************");
    console.log("*   Creating New Department  *");
    console.log("******************************");

    // prompts user for new department, costs, and sales (costs and sales both defaulting at 0 if left blank)
    inquirer.prompt([
    {
        type: "input",
        name: "deptName",
        message: "Type in your new department name: "
    }, {
        type: "input",
        name: "overHeadCost",
        message: "Type in the overhead cost: ",
        default: 0,
        validate: function(val){
            if(isNaN(val) === false){return true;}
            else{return false;}
        }
    }, {
        type: "input",
        name: "prodSales",
        message: "Type in the product sales: ",
        default: 0,
        validate: function(val){
            if(isNaN(val) === false){return true;}
            else{return false;}
        }
    }
    ]).then(function(ans){
        connection.query('INSERT INTO departments SET ?',{
            department_name: ans.deptName,
            over_head_costs: ans.overHeadCost,
            product_sales: ans.prodSales
        }, function(err){
            if(err) throw err;
            console.log('New department added.');
            // confirm whether or not the user wants to see the options again
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

// run the node application
run();