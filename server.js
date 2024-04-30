const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

// Configurar Handlebars como el motor de plantillas
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  })
);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'), {
  // Agrega esta opción para especificar el tipo MIME de los archivos JavaScript
  'Content-Type': 'application/javascript'
}));

// Ruta raíz
app.get('/', (req, res) => {
  try {
    // Obtener la ruta absoluta del archivo JSON de productos
    const productosPath = path.join(__dirname, 'data', 'productos.json');
    
    // Verificar si el archivo existe
    if (!fs.existsSync(productosPath)) {
      throw new Error('El archivo productos.json no existe');
    }

    // Leer el archivo JSON de productos
    const data = fs.readFileSync(productosPath, 'utf8');

    // Verificar si el archivo está vacío
    if (!data) {
      throw new Error('El archivo productos.json está vacío');
    }

    // Parsear el JSON
    const productos = JSON.parse(data);

    res.render('index', { productos });
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
