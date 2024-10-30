
var productos = [];
document.addEventListener("DOMContentLoaded", function(event) {
    const tbody = document.getElementById('carrito-tbody'); 
    const resumenPedido = document.getElementById('resumen-pedido');
    const totalFinal = document.querySelector('#total-final .total-amount');
    

    // Función para actualizar unidades
    function actualizarUnidades(sku, nuevaCantidad) {
        const producto = productos.find((prod) => prod.SKU === sku);
        if (producto) {
            producto.quantity = nuevaCantidad < 1 ? 0 : nuevaCantidad;
            cargarCarrito();
        }
    }

    //Función para obtener info productos
    function obtenerInformacionProducto(sku){
        const info = productos.find((prod)=> prod.SKU === sku);
        if (producto){
            return{
                sku:producto.SKU,
                title:producto.title,
                quantity:producto.quantity  
            };
        }return null;
    }

    // Función para calcular el total
    function calcularTotal() {
        
        return productos.reduce((acc, producto) => acc + producto.quantity *producto.price, 0);
    }

    // Función para cargar carrito en la interfaz
    function cargarCarrito() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);//evitando duplicados
    }
    while (resumenPedido.firstChild) {
        resumenPedido.removeChild(resumenPedido.firstChild);//evitando duplicados
    }

        let totalGlobal = 0;
      

        productos.forEach((producto) => {

              // Verificar que precio es un número válido antes de usar toFixed Me da error constante
            //var precio = Number(producto.price); 

            // Crear fila en la tabla de productos
            const fila = document.createElement('tr');

            // Celda de producto
            const celdaProducto = document.createElement('td');
            celdaProducto.innerText = `${producto.title} (${producto.SKU})`;

            // Celda de cantidad con control
            const celdaCantidad = document.createElement('td');
            const divCantidad = document.createElement('div');
            divCantidad.classList.add('cantidad-control');

            const btnDecrementar = document.createElement('button');
            btnDecrementar.textContent = '-';
            btnDecrementar.classList.add('btn_restar');
            btnDecrementar.addEventListener('click', function() {
                actualizarUnidades(producto.SKU, producto.quantity - 1);
            });

            const inputCantidad = document.createElement('input');
            inputCantidad.type = 'number';
            inputCantidad.value = producto.quantity;
            inputCantidad.readOnly = true;
            inputCantidad.classList.add('inputCantidad');

            const btnIncrementar = document.createElement('button');
            btnIncrementar.textContent = '+';
            btnIncrementar.classList.add('btn_sumar');
            btnIncrementar.addEventListener('click', function() {
                actualizarUnidades(producto.SKU, producto.quantity + 1);
            });

            divCantidad.append(btnDecrementar, inputCantidad, btnIncrementar);
            celdaCantidad.append(divCantidad);

            // Celda de precio unitario
            const celdaPrecioUnidad = document.createElement('td');
            celdaPrecioUnidad.textContent = `${producto.price.toFixed(2)}€`;

            // Celda de total del producto
            const celdaTotal = document.createElement('td');
            const totalProducto = producto.quantity * producto.price;
            celdaTotal.textContent = `${totalProducto.toFixed(2)}€`;
            totalGlobal += totalProducto;

            // Añadir celdas a la fila y la fila a la tabla
            fila.append(celdaProducto, celdaCantidad, celdaPrecioUnidad, celdaTotal);
            tbody.appendChild(fila);

            // Actualizar resumen de pedido
            if (producto.quantity > 0) {
                const liResumen = document.createElement('li');
                liResumen.textContent = `${producto.quantity} x ${producto.title} - ${(producto.quantity * producto.price).toFixed(2)}€`;
                resumenPedido.appendChild(liResumen);
              }
            });

        // Actualizar total final en el DOM
        totalFinal.textContent = `${calcularTotal().toFixed(2)}€`;
    }

    // Cargar productos iniciales desde API y ejecutar cargarCarrito()
    fetch('https://jsonblob.com/api/1300026892709912576')
        .then((response) => response.json())
        .then((data) => {
            productos = data.products;
            cargarCarrito();
        })
        .catch((error) => console.error('Error al cargar los productos:', error));
});




