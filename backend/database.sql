CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, price) VALUES 
('Laptop', 'High-performance laptop', 999.99),
('Phone', 'Latest smartphone', 499.99),
('Headphones', 'Wireless headphones', 79.99);