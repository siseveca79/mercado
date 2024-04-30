$(document).ready(function() {
  // Función para renderizar los productos del carrito en el modal
  function renderizarCarrito(productosEnCarrito) {
    var carritoHTML = '';

    // Iterar sobre cada producto en el carrito y construir el HTML correspondiente
    productosEnCarrito.forEach(function(producto) {
      carritoHTML += `
        <li class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="/img/${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
              <span>${producto.nombre}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-secondary btn-quitar-item">-</button>
              <span>${producto.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary btn-agregar-item">+</button>
              <span class="subtotal">${producto.subtotal.toFixed(2)} USD</span>
            </div>
          </div>
        </li>
      `;
    });

    // Actualizar el contenido del carrito en el modal
    $('#listaCarrito').html(carritoHTML);
  }

  // Evento para agregar un producto al carrito
  $('.btn-agregar').click(function() {
    // Implementa la lógica para agregar un producto al carrito aquí

    // Después de agregar el producto, renderizar el carrito en el modal
    // (Aquí asumimos que tienes una variable productosEnCarrito que contiene los productos actualmente en el carrito)
    renderizarCarrito(productosEnCarrito);
  });

  // Evento para quitar un producto del carrito
  $('.btn-quitar-item').click(function() {
    // Implementa la lógica para quitar un producto del carrito aquí

    // Después de quitar el producto, renderizar el carrito en el modal
    // (Aquí asumimos que tienes una variable productosEnCarrito que contiene los productos actualmente en el carrito)
    renderizarCarrito(productosEnCarrito);
  });

  // Evento para agregar una unidad al producto en el carrito
  $('.btn-agregar-item').click(function() {
    // Implementa la lógica para aumentar la cantidad de un producto en el carrito aquí

    // Después de aumentar la cantidad, renderizar el carrito en el modal
    // (Aquí asumimos que tienes una variable productosEnCarrito que contiene los productos actualmente en el carrito)
    renderizarCarrito(productosEnCarrito);
  });

  // Mostrar el modal de carrito cuando se haga clic en el botón "Ver Carrito"
  $('#verCarritoNav').click(function() {
    // Renderizar el carrito en el modal al abrirlo
    // (Aquí asumimos que tienes una variable productosEnCarrito que contiene los productos actualmente en el carrito)
    renderizarCarrito(productosEnCarrito);

    $('#carritoModal').modal('show'); // Mostrar el modal
  });
});
