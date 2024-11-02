import Carrito from "./carrito.js";




document.addEventListener("DOMContentLoaded", function(event) {
    const cesta= new Carrito()
    const tbody = document.getElementById('carrito-tbody');
    const resumenPedido = document.getElementById('resumen-pedido').querySelector('ul');
    const totalFinal = document.querySelector('#total-final .total-amount');
    const vaciarCarrito=document.querySelector('#vaciar')

     // Función para cargar carrito en la interfaz
     function cargarTablaCarrito() {
        while (resumenPedido.firstChild) {
            resumenPedido.removeChild(resumenPedido.firstChild);//evitando duplicados
        }
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);//evitando duplicados
        }


        let totalGlobal = 0;

        cesta.productos.forEach((producto)=>{

             // Crear fila en la tabla de productos
            
            const fila = document.createElement('tr');

             // Celda de producto
            
            const celdaProducto = document.createElement('td');
            celdaProducto.innerText = `${cesta.obtenerInformacionProducto(producto.SKU)}`;

             // Celda de cantidad con control
            const celdaCantidad = document.createElement('td');
            const divCantidad = document.createElement('div');
            divCantidad.classList.add('cantidad-control');

            
            const btnDecrementar = document.createElement('button');
            btnDecrementar.textContent = '-';
            btnDecrementar.classList.add('btn_restar');
            btnDecrementar.addEventListener('click', function() {
            cesta.actualizarUnidades(producto.SKU, producto.quantity - 1);
            cargarTablaCarrito()
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
            cesta.actualizarUnidades(producto.SKU, producto.quantity + 1);
            cargarTablaCarrito()
            });

            
            divCantidad.append(btnDecrementar, inputCantidad, btnIncrementar);
            celdaCantidad.append(divCantidad);

             // Celda de precio unitario
            
            const celdaPrecioUnidad = document.createElement('td');
            celdaPrecioUnidad.textContent = `${cesta.obtenerPrecioProducto(producto.SKU).toFixed(2)}€`;

             // Celda de total del producto
            const celdaTotal = document.createElement('td');
            const totalProducto = cesta.obtenerInformacionProducto(producto.SKU);
            const totalPProducto=cesta.obtenerPrecioTotalP(producto.SKU).toFixed(2)
            celdaTotal.textContent = `${totalPProducto}€`;
            totalGlobal += totalPProducto;

             // Añadir celdas a la fila y la fila a la tabla
            fila.append(celdaProducto, celdaCantidad, celdaPrecioUnidad, celdaTotal);
            tbody.append(fila);

             // Actualizar resumen de pedido
            if (producto.quantity > 0) {
                const liResumen = document.createElement('li');
                liResumen.classList.add('prod_descripcion');
                liResumen.textContent = `${cesta.obtenerInfoProducto(producto.SKU)}`;
                resumenPedido.appendChild(liResumen);
            }
         // Actualizar total final en el DOM
            totalFinal.textContent = `${cesta.calcularTotal().toFixed(2)}€`;

        });

    } 
        // Función para vaciar el carrito
        vaciarCarrito.addEventListener('click', (event) => {
            event.preventDefault();
            cesta.vaciarCarrito();
            cargarTablaCarrito(); 
    
        });


// Cargar productos iniciales desde API y ejecutar cargarCarrito()
fetch('https://jsonblob.com/api/1300026892709912576')
    .then((response) => response.json())
    .then((data) => {
        cesta.productos = data.products;

        cargarTablaCarrito()
    })
    .catch((error) => console.error('Error al cargar los productos:', error));


});
