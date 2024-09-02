const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Configuración de la carpeta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', async (req, res) => {
  try {
    // Obtén los productos desde la API externa
    const response = await axios.get('http://localhost:32002/api/product');
    const products = response.data;

    // Renderiza la vista EJS con los datos de los productos
    res.render('index', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
