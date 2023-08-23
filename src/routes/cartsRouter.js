const express = require('express');
const CartManager = require('../managers/cartManager');
const cartsRouter = express.Router();

const cartManager = new CartManager();

// Ruta raíz POST /api/carts
cartsRouter.post('/', (req, res) => {
    try {
      const newCart = cartManager.createCart();
      res.send({ status: "success", message: "Cart successfully created" })
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Error! The Cart could not be created",
      });
  }
})

// Ruta GET /api/carts/:cid
cartsRouter.get('/:cid', (req, res) => {
  const cartId = +req.params.cid;
  res.send({ Cart: cartManager.getCart(cartId) });
});


// Ruta POST /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = +req.params.cid;
  const productId = +req.params.pid;

  const cart = cartManager.getCart(cartId)
  if(!cart){
    res.status(400).send({status:"error", message:"The Cart doesn't exists"})
    return;
  }
  if(cartManager.addProductToCart(cartId,productId)){
    res.send({ status: "success", message: `Product ${productId} successfully added to Cart ${cartId}` })
  }else{
    res.status(500).send({statu:"error",message:`Error! The product could not be added to the Cart ${cartId}`})
  }

});


module.exports = cartsRouter;
