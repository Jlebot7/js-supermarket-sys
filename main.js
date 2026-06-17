let productos = [];

fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        console.log("Productos cargados:", productos);
        renderizarProductos(productos);
    })
    .catch(error => console.error('Error al cargar los productos:', error));

function renderizarProductos(listaDeProductos) {
    console.log("Aquí es donde crearemos el HTML dinámicamente...");
}