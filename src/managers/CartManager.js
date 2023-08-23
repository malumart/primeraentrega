const fs = require('fs');

class CartManager {
    constructor() {
      this.carts = [];
      this.path = "Carts.json";
      this.createFile();
      }

  createFile() {
        if (!fs.existsSync(this.path)) {
          this.saveCartsInJSON();
  }}

  createCart() {
    this.carts = this.getCarts();
    let id = this.carts.length + 1;
    this.carts.push({ id, products: [] });
    this.saveCartsInJSON();
    return true;
  }

  getCarts() {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return this.carts;
  }

  getCart(cartId) {
        const carts = this.getCarts();
        return carts.find((cart) => cart.id === cartId) || console.error("Not found");;
    
  }

  addProductToCart(cid, pid) {
    this.carts = this.getCarts();
    const cart = this.carts.find((cart) => cart.id === cid);
    if (!cart) {
      return false;
    }

    let product = cart.products.find((prod) => prod.product === pid);

    //si el producto ya existe en el carrito seleccionado
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    this.saveCartsInJSON();
    console.log("Cart updated!");
    return true; //respuesta para el endpoint
  }

    saveCartsInJSON() {
      fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }
  }

module.exports = CartManager;