/*seeds for sql table*/
USE bamazon;
/* insert value*/
INSERT INTO products(product_name,department_name,price,stock_quantity)
    VALUES
    ("laptop","Electronis",800,10),
    ("desktop","Electronis",1200,20),
    ("mobile","accessories",500,30),
    ("books","library,120",20),
    ("sun_glass","accessories",30,50),
    ("mp3","Electronis",300,20);
