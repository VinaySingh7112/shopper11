// Import the required modules
const express = require('express');
const mysql = require('mysql');

// Create an Express app
const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

// Function to add a product to the database
function addProduct(product) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error establishing database connection:', err);
      return;
    }

    // Perform the database query
    connection.query('INSERT INTO products SET ?', product, (err, result) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error adding product:', err);
        return;
      }

      console.log('Product added successfully!');
    });
  });
}

// Example usage
const productData = {
  title: 'Example Product',
  price: 10.99,
  category: 'Electronics'
};

addProduct(productData);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
