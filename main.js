let productos = [];
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            renderizarProductos();
        })
        .catch(error => console.error('Error al cargar productos:', error));
    document.getElementById("limpiarCarrito").addEventListener("click", limpiarCarrito);
});

function renderizarProductos() {
    const contenedor = document.getElementById("productosLista");
    productos.forEach(prod => {
        const div = document.createElement("div");
        div.className = "producto-card";
        div.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Categoría: ${prod.categoria}</p>
            <p>Precio: $${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const lista = document.getElementById("carritoLista");
    const spanTotalPrecio = document.getElementById("totalPrecio");
    const spanTotalCantidad = document.getElementById("totalCantidad");

    lista.innerHTML = "";
    let sumaTotal = 0;

    carrito.forEach((item) => {
        const emoji = item.emoji || "🛒";
        sumaTotal += item.precio;

        lista.innerHTML += `
            <div class="carrito-item">
                <div class="item-emoji" aria-hidden="true">${emoji}</div>
                <div class="carrito-item-info">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div class="carrito-item-precio">$${item.precio.toFixed(2)}</div>
                </div>
            </div>
        `;
    });

    spanTotalPrecio.innerText = sumaTotal.toFixed(2);
    spanTotalCantidad.innerText = carrito.length;
}


function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}