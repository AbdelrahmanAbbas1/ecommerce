CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, price) VALUES 
('Laptop', 'High-performance laptop', 999.99),
('Phone', 'Latest smartphone', 499.99),
('Headphones', 'Wireless headphones', 79.99),
('Phone Cover', 'Cover for Iphone', 79.99);


CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)

ALTER TABLE products
ADD COLUMN category_id INT,
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

INSERT INTO categories (name) VALUES
("Electronics"),
("Accessories"),
("Gadgets");

UPDATE products
SET category_id = 1
WHERE id = 1;