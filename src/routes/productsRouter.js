const express = require('express');
const productsRouter = express.Router();
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();

// Ruta GET /api/products
productsRouter.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Ruta GET /api/products/:pid
productsRouter.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Ruta POST /api/products
productsRouter.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product' });
  }
});

// Ruta PUT /api/products/:pid
productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProductIndex = productsDB.findIndex(product => product.id === productId);
  if (updatedProductIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = { ...productsDB[updatedProductIndex], ...req.body };
  productsDB[updatedProductIndex] = updatedProduct;

  res.json(updatedProduct);
});

// Ruta DELETE /api/products/:pid
productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const deletedProductIndex = productsDB.findIndex(product => product.id === productId);
  if (deletedProductIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deletedProduct = productsDB.splice(deletedProductIndex, 1);
  res.json(deletedProduct);
});

module.exports = productsRouter;
