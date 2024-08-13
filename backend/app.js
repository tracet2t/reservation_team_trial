// app.js
const express = require('express');
const app = express();

// Define a route
app.get('/abc', (req, res) => {
  res.send('Hello, World!');
});
// Define a route
app.get('/cba', (req, res) => {
    res.send('Hello, World!');
  });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;  // Export the app for testing
