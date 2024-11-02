export default class Carrito{

    constructor(){
        this.productos= [];

    }

    actualizarUnidades(sku, unidades) {
        const producto = this.productos.find(prod => prod.SKU === sku);
        if (producto) {
            producto.quantity = unidades > 0 ? unidades : 0; // No elimina el producto; solo pone cantidad a 0
        }
    }
    


 
    //Función para obtener info productos
        obtenerInformacionProducto(sku){
            const producto = this.productos.find((prod)=> prod.SKU === sku);
            if (producto){
                return `${producto.title} \n REF:${producto.SKU}`
            }
            return null;
        }

            //Función para obtener info productos
            obtenerInfoProducto(sku){
                const producto = this.productos.find((prod)=> prod.SKU === sku);
                if (producto){
                    return `${producto.quantity} x ${producto.title}  /  ${producto.quantity} x ${producto.price}`
                }
                return null;
            }

        obtenerCarrito() {
            let total = 0;
            const productosCarrito = [];

    // Iteramos para calcular el total y construir el listado de productos
            for (const prod of this.productos) {
                const precio = this.obtenerPrecioProducto(prod.sku);
                total += (precio * prod.quantity);
                productosCarrito.push(prod);
            }
            return {
                total: total,
                products: productosCarrito
            };
        }

        obtenerPrecioProducto(sku) {
            const precio =this.productos.find((prod)=> prod.SKU === sku);
            if (precio){
                return precio.price
            }
            return 0;
        }
        obtenerPrecioTotalP(sku) {
            const precio =this.productos.find((prod)=> prod.SKU === sku);
            if (precio){
                return precio.price*precio.quantity
            }
            return 0;
        }
          // Si el SKU existe, devuelve el precio; si no, devuelve 0
        calcularTotal() {
        
            return this.productos.reduce((acc, producto) => acc + (producto.quantity *producto.price), 0);
        }
        vaciarCarrito() {
            this.productos = this.productos.map(prod => ({
                SKU: prod.SKU,
                title: prod.title,
                price: prod.price,
                quantity: 0 }));
            //this.products=[];
        }
}
