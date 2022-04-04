//Trae los productos desde el JSON 
async function cargarProductos(){
    let promesa = await fetch('productos.json')
    let productosJSON = await promesa.json()
    return productosJSON    
}

const calcularTotal = function (precio, cantidad) {
    let total = precio * cantidad;
    return total;
}
//suma productos y los carga en el JSON, funcion llamada por el evento click de los botones de productos
function sumarProducto(indice) { 
    compras[--indice].cantidad++; 
    localStorage.setItem('Compra', JSON.stringify(compras)) 
};
//Funcion que se encarga de eliminar los productos del carrito
function eliminarProductos(compras, totalCarrito) {
    compras.forEach((productoSeleccionado, indice) => {
        if (productoSeleccionado.cantidad > 0) {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                productoSeleccionado.cantidad --;
                totalCarrito -= productoSeleccionado.precio;
                divCarrito.innerHTML = ""
                compras.forEach((productoSeleccionado, indice) => {
                    if (productoSeleccionado.cantidad != 0) {
                        divCarrito.innerHTML += ` 
                      <div class="card" id="producto${indice}" style="width: 18rem;">
                          <div class="card-body">
                              <p>Producto: ${productoSeleccionado.nombre} </p>
                              <p>Cantidad: ${productoSeleccionado.cantidad}</p>
                              <p>Precio: ${calcularTotal(productoSeleccionado.precio, productoSeleccionado.cantidad)}</p>
                              <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                          </div>
                      </div>`

                    }
                })
                localStorage.setItem('Compra', JSON.stringify(compras));
                totalCarrito > 0 ? divCarrito.innerHTML += `<p> El precio total es: ${totalCarrito}</p>` :  carroVacío();
                eliminarProductos(compras, totalCarrito);
            })
        }

    })
}

//Funcion que muestra una alerta de la librería SweetAlert
function carroVacío() {
    Swal.fire({
        title: 'Info!',
        text: 'Su carro está vacío',
        icon: 'info',
        confirmButtonText: 'Entendido'
    })
}