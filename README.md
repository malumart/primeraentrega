# primeraentrega

Este es un proyecto de Node.js y Express que implementa una API para la gestión de productos y carritos de compras.

## Requisitos

- Node.js (https://nodejs.org/)
- npm (viene con Node.js)

## Instalación

1. Clona este repositorio en tu máquina local: git clone https://github.com/malumart/primeraentrega.git

2. Navega al directorio del proyecto: cd primeraentrega
 
3. Instala las dependencias utilizando npm: npm install

## Uso

1. Inicia el servidor utilizando el comando: npm start

2. Abre tu navegador web y accede a `http://localhost:8080` para verificar que el servidor está funcionando.

3. Utiliza herramientas como Postman para realizar solicitudes HTTP a la API.

## Solicitudes

Solicitudes de productos

GET /api/products
Devuelve una lista de todos los productos disponibles.


GET /api/products/:pid
Devuelve los detalles de un producto específico según su ID.


POST /api/products
Agrega un nuevo producto utilizando el cuerpo de la solicitud en formato JSON.

PUT /api/products/:pid
Actualiza los detalles de un producto existente utilizando el ID del producto y el cuerpo de la solicitud en formato JSON.

DELETE /api/products/:pid
Elimina un producto según su ID.


Solicitudes de carritos
POST /api/carts
Crea un nuevo carrito de compras.

GET /api/carts/:cid
Devuelve la lista de productos en un carrito específico según su ID.

POST /api/carts/:cid/product/:pid
Agrega un producto a un carrito específico utilizando el ID del carrito y el ID del producto. 
