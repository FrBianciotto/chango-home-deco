let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let divProductos = document.getElementById('productos');
let btnComprar= document.getElementById ('comprar');
const alfombras = document.getElementById('alfombra');
const maderas = document.getElementById('madera');

let compras = [];
//llamado de la funcion que trae los productos desde el JSON
let productos = cargarProductos();

productos.then(data => {
    cargarHTML(data)
    data.forEach((p, indice) => {
        //Carga del objeto compra que va a contener el carrito    
        compras[indice] = new Compra(p.nombre, p.precio, p.imagen)
    });

    //Trae datos del storage o los carga
    localStorage.getItem('Compra') ? compras = JSON.parse(localStorage.getItem('Compra')) : localStorage.setItem('Compra', JSON.stringify(compras));

   
   filtrado(alfombras,data)
   filtrado(maderas,data)
    
    
})


//Muestra los productos cargadon en el carrito 
buttonCarrito.addEventListener('click', () => {
    let totalCarrito = 0
    divCarrito.innerHTML = "";
    compras.forEach((productoSeleccionado, indice) => {
        let { nombre, cantidad, precio, img } = productoSeleccionado;
        if (productoSeleccionado.cantidad != 0) {
            totalCarrito += calcularTotal(precio, cantidad);
            divCarrito.innerHTML += ` 
            <div class="card mb-3" id="producto${indice}" style="max-width: 540px;">
                <div class="row g-0">    
                    <div class="col-md-4">
                        <img src="${img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p>Producto: ${nombre} </p>
                            <p>Cantidad: ${cantidad}</p>
                            <p>Precio: ${calcularTotal(precio, cantidad)}</p>
                            <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>`

        }
    })


    totalCarrito > 0 ? divCarrito.innerHTML += `<p> El precio total es: ${totalCarrito}</p>` : divCarrito.innerHTML="Su carro está vacío";

    eliminarProductos(compras, totalCarrito);
    btnComprar.onclick = ()=>{finalizarCompra(totalCarrito);totalCarrito=0}
})

