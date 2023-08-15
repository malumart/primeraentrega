const express = require('express');
const app = express();
const PORT = 8080;


const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

app.use(express.json());

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Is working');
});

// Rutas usando los routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// Correr Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});