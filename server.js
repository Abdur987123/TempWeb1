const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const path = require('path');

// MySQL connection
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'AinOptics1'
});

// Function to create Products table if it doesn't exist
async function createProductsTable() {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Products (
        product_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        manufacturer VARCHAR(255),
        cost_price DECIMAL(10, 2) NOT NULL,
        selling_price DECIMAL(10, 2) NOT NULL,
        quantity_in_stock INT NOT NULL
      );
    `);
    console.log('Products table created');
  } catch (error) {
    console.error('Error creating Products table:', error);
  }
}

// Create the table on startup
createProductsTable();

// Define the port for the server
const PORT = process.env.PORT || 3000;

// Function to add a product
async function addProduct(data) {
  try {
    // Validate data
    if (!data.productName || !data.productDescription) {
      throw new Error('Missing required fields');
    }

    // Add the product to the database
    await connection.query(`
      INSERT INTO Products (name, description, manufacturer, cost_price, selling_price, quantity_in_stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      data.productName,
      data.productDescription,
      data.manufacturer || null,
      data.costPrice,
      data.sellingPrice,
      data.quantityInStock
    ]);

    // Send a successful response
    console.log('Product added successfully');
    return {
      success: true,
      message: 'Product added successfully',
      data: {
        productId: connection.lastInsertId // Include product ID for client-side reference
      }
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return {
      success: false,
      message: `Error adding product: ${error.message}`
    };
  }
}

// Function to search for products
async function searchProducts(searchTerm) {
  try {
    const results = await connection.query(`
      SELECT * FROM Products WHERE name LIKE ? OR description LIKE ?
    `, ['%' + searchTerm + '%', '%' + searchTerm + '%']);
    console.log(`Found ${results.length} products`);
    return results;
  } catch (error) {
    console.error('Error searching for products:', error);
    return []; // Return empty array to handle errors
  }
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    // Check if product exists
    const product = await connection.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [productId]
    );
    if (!product.length) {
      throw new Error('Product not found');
    }

    // Delete the product
    await connection.query(`
      DELETE FROM Products WHERE product_id = ?
    `, [productId]);
    console.log('Product deleted successfully');
    return {
      success: true,
      message: 'Product deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      message: `Error deleting product: ${error.message}`
    };
  }
}

// Serve static files
app.use(express.static('public'));

// Parse JSON data in requests
app.use(express.json());

// Post request handler for adding a product
app.post('/addproduct', async (req, res) => {
  const response = await addProduct(req.body);
  res.json(response);
});

// Get request handler for searching products
app.get('/searchproducts/:searchTerm', async (req, res) => {
  const products = await searchProducts(req.params.searchTerm);
  res.send(products); // Send product data to client
});


// Delete request handler for deleting a product
app.delete('/deleteproduct/:productId', async (req, res) => {
  const response = await deleteProduct(req.params.productId);
  res.json(response);
});

// Route for the dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});