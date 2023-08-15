const fs = require('fs');
const path = "carritos.json";

class CartManager {
    constructor() {
        this.carts = [];
        this.path = path;
      }


  createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };

    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCart(cartId) {
    try {
        const cartData = fs.readFileSync('carts.json', 'utf8');
        const carts = JSON.parse(cartData);
        return carts.find(cart => cart.id === cartId);
      } catch (error) {
        return null;
      }
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCart(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const existingProductIndex = cart.products.findIndex(product => product.product === productId);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCarts();
    return cart.products;
  }

  loadCarts() {
    try {
      const cartData = fs.readFileSync('carts.json', 'utf8');
      return JSON.parse(cartData);
    } catch (error) {
      return [];
    }
  }

  saveCarts() {
    try {
        const cartData = fs.readFileSync('carts.json', 'utf8');
        const carts = JSON.parse(cartData);
        carts.push(cart);
        fs.writeFileSync('carts.json', JSON.stringify(carts, null, 2));
      } catch (error) {
        const carts = [cart];
        fs.writeFileSync('carts.json', JSON.stringify(carts, null, 2));
      }  
    }

  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

module.exports = CartManager;

  
 

