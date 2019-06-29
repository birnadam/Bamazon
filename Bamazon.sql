CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(6,2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (id)
    );
    
select * from Products;
INSERT INTO Products(product_name, department_name, price, stock_quantity)
VALUES ("Ray Bans Sunglasses","Accessories",130.00,50),
	("Toshiba LED TV","Electronics",179.99,25),
	("Fossil Men's Smartwatch","Smartwatches",257.03,40),
    ("VNOX Zelda Ring","Rings",10.99,100),
    ("Razer Deathadder","PC Gaming",44.99,200),
    ("AMD Ryzen 2700X","PC Gaming",279.99,72),
    ("Adidas NMD_cs1 GTX","Fashion Sneakers",200,26),
    ("Nikon D850","Cameras",2996.95,55),
    ("Baked Corn Puffs","Food",3.50,42),
    ("Bose Home Speaker","Speakers",399.00,142);

CREATE TABLE Departments(
	department_id MEDIUMINT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    product_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id));

select * from Departments;    
INSERT INTO Departments (department_name, over_head_costs, product_sales)
VALUES ('Accessories', 2500.00, 5000.00),
	('Electronics', 11500.00, 50000.00),
    ('Smartwatches', 5500.00, 9000.00),
    ('Rings', 1500.00, 5000.00),
    ('PC Gaming', 2500.00, 25000.00),
    ('Fashion Sneakers', 2500.00, 10000.00),
    ('Cameras', 2500.00, 17000.00),
    ('Food', 500.00, 17500.00),
    ('Speakers', 1100.00, 3000.00);