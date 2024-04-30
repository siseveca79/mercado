$(document).ready(function () {
  // Inicializar la variable productosEnCarrito como un arreglo vacío
  var productosEnCarrito = [];

  // Variable para almacenar los productos
  var productos = [];

  // Cargar los productos al principio
  $.getJSON('/data/productos.json', function (data) {
    // Almacena los productos una vez que se han cargado
    productos = data;
  });

  // Evento para agregar un producto al carrito
  $(document).on('click', '.btn-agregar', function () {
    // Obtener el ID del producto del botón presionado
    var productoId = $(this).data('id');

    // Validar el ID del producto
    if (!productoId || isNaN(productoId)) {
      console.error('ID de producto inválido:', productoId);
      return;
    }

    // Obtener los detalles del producto
    var producto = obtenerProducto(productoId);

    // Agregar el producto al arreglo productosEnCarrito
    var productoEnCarrito = productosEnCarrito.find(function (p) {
      return p.id === producto.id;
    });

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      producto.cantidad = 1;
      productosEnCarrito.push(producto);
    }

    // Renderizar el carrito en el modal
    renderizarCarrito();
  });

  // Función para obtener los detalles de un producto por su ID
  function obtenerProducto(id) {
    // Buscar el producto con el ID proporcionado
    return productos.find(function (p) {
      return p.id === id;
    });
  }

  // Función para renderizar los productos del carrito en el modal
  function renderizarCarrito() {
    var carritoHTML = '';

    // Iterar sobre cada producto en el carrito y construir el HTML correspondiente
    productosEnCarrito.forEach(function (producto) {
      carritoHTML += `
        <li class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="/img/${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
              <span>${producto.nombre}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-secondary btn-quitar-item" data-id="${producto.id}">-</button>
              <span>${producto.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary btn-agregar-item" data-id="${producto.id}">+</button>
              <span class="subtotal">${(producto.precio * producto.cantidad).toFixed(2)} USD</span>
            </div>
          </div>
        </li>
      `;
    });

    // Actualizar el contenido del carrito en el modal
    $('#listaCarrito').html(carritoHTML);
  }

  // Evento para mostrar el modal de carrito cuando se haga clic en el botón "Ver Carrito"
  $('#verCarritoNav').click(function () {
    // Renderizar los productos del carrito en el modal
    renderizarCarrito();

    // Mostrar el modal
    $('#carritoModal').modal('show');
  });

});
