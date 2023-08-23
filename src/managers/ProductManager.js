const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = 'Productos.json';
    this.createFile();
  }


  createFile() {
    if (!fs.existsSync(this.path)) {
      this.saveProductsInJSON();
    }
  }

  addProduct (
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails
  ){
    
    if (this.products.length === 0) {
      newProduct.id = 1;
  } else {
      newProduct.id = this.products[this.products.length - 1].id + 1;
  }
  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
    this.products.push(newProduct);
    this.saveProductsInJSON();
    return true;
  }

  getProducts (){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return this.products;
  }


  getProductById = (id) => {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }
    return product;
  };

  updateProduct = async (id, updatedFields) => {
    const index = this.products.findIndex((p) => p.id == id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found.`);
    }
    this.products[index] = { ...this.products[index], ...updatedFields };
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    return this.products[index];
  };

  deleteProduct = async (id) => {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found.`);
    }
    this.products.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  };

  saveProductsInJSON() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

}


const manager = new ProductManager;
  

/* async function testProductManager() {
    try {
        console.log(await manager.getProducts());

        const firstProduct = {
            title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25,
        };

        await manager.addProduct(firstProduct);
        console.log(await manager.getProducts());

        const secondProduct = {
            title: 'Producto 2',
            description: 'Otro producto de prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25,
        };

        await manager.addProduct(secondProduct);


        const productById = manager.getProductById(2);
        console.log(productById);

        const updatedProduct = await manager.updateProduct(1, { price: 250 });
        console.log(updatedProduct);


        await manager.deleteProduct(2);
        console.log(await manager.getProducts());
    } catch (error) {
        console.error(error.message);
    }
}

testProductManager(); */

module.exports = ProductManager;




