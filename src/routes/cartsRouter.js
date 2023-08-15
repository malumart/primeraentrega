const express = require('express');
const cartsRouter = express.Router();
const CartManager = require('../managers/CartManager');

const cartManager = new CartManager();

// Ruta raíz POST /api/carts
cartsRouter.post('/', (req, res) => {
    try {
      const newCart = cartManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: 'Error creating cart' });
    }
  });

// Ruta GET /api/carts/:cid
cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCart(cartId);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(cart.products);
});


// Ruta POST /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedProducts = cartManager.addProductToCart(cartId, productId, quantity);
    res.status(201).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart' });
  }

});


module.exports = cartsRouter;
