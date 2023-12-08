// server.js
import express from 'express';
const app = express();
const port = 3000;

const uploadProductData = (data) => {
    // IMPLEMENT ME!
}

const getProductDataByCID = (cid) => {
    // IMPLEMENT ME!
}

// Define a simple route
app.get('/upload', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
