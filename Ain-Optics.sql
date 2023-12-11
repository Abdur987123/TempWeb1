
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    manufacturer VARCHAR(255),
    cost_price DECIMAL(10, 2),
    selling_price DECIMAL(10, 2),
    quantity_in_stock INT
);

-- Sales Table
CREATE TABLE Sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    sale_date DATE,
    quantity_sold INT,
    total_sale_amount DECIMAL(10, 2),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Designs Table
CREATE TABLE Designs (
    design_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    design_name VARCHAR(255),
    design_description TEXT,
    prototype_image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE StockMovements (
    movement_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    movement_date DATE,
    movement_type ENUM('addition', 'subtraction'),
    quantity_changed INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    sale_date DATE,
    quantity_sold INT,
    total_sale_amount DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    profit DECIMAL(10, 2),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE LostGlasses (
    lost_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    lost_date DATE,
    description TEXT,
    reported_by VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
