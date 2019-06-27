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
