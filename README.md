# Bamazon

## What it is
Bamazon is a CLI app that is similar to Amazon
<br>It is an app that reveals inventory being depleted as purchases are being made.
<br>There are many different functions but this app has specifically three sections: 
1. **customer** - this is where you can purchase items if they are in stock
2. **manager** - this is where you can view products, view low inventory, add to inventory, or add new items
3. **supervisor** - this is where you can view products by department or create new departments

## How it was made
Bamazon was created using **Node, MySQL, Inquirer, and Console.table**. 

The application uses MySQL for data, Inquirer for user interaction, and Console.table for displaying data.
<br>I first created a dataset for Bamazon such as a couple of items, departments they're in, and how much they cost.
<br>Essentially that data is then displayed for the user, and the user must answer some prompts which then alter the data.

## How it works
First you need to setup your CLI app:
1. Download the files here in this repository
2. Pull up your console in the downloaded folder and type "npm init -y" to intialize your package.json
3. Type in "npm i mysql", "npm i inquirer", and "npm i console.table" to install all the proper modules
4. Lastly, you want to open up MySQL workbench, paste the script under Bamazon.sql over, and execute it

Once your app is all setup you simply enter one of the following lines into the terminal:
1. "node bamazonCustomer.js" - brings up a CLI app for customers
2. "node bamazonManager.js" - brings up a CLI app for managers
3. "node bamazonSupervisor.js" - brings up a CLI app for supervisors

## Screenshots
Here is how bamazonCustomer looks:
<br>![bamazonCustomer image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/customerDemoOne.JPG?raw=true)
<br>![bamazonCustomer2 image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/customerDemoTwo.JPG?raw=true)

Here is how bamazonManager looks:
<br>![bamazonManager image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/managerDemoOne.JPG?raw=true)
<br>![bamazonManager2 image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/managerDemoTwo.JPG?raw=true)

Here is how bamazonSupervisor looks:
<br>![bamazonSupervisor image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/supervisorDemoOne.JPG?raw=true)
<br>![bamazonSupervisor2 image](https://github.com/birnapwnsu/Bamazon/blob/master/Screenshots/supervisorDemoTwo.JPG?raw=true)
