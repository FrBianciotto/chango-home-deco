//llamado de la funcion que trae los productos desde el JSON
let productos = cargarProductos();

productos.then( data => {
    data.forEach((p) => {
        divProductos.innerHTML += `
            <div id="producto${p.id}" class="card mt-2" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top mt-2"  alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Color: ${p.color}.</p>
                        <p class="card-text">Tamaño: ${p.tamanio}.</p>
                        <p class="card-text">Precio: $${p.precio}.</p>
                        <button id="btn_${p.id}" href="#" class="btn btn-primary btn-agregar">Añadir al carrito</button>
                    </div>
            </div>`;
    }); 

    const buttons= document.getElementsByClassName("btn-agregar");
    for(const btn of buttons){
        btn.onclick = ()=> sumarProducto(btn.id.split('_')[1]); 
    }

})

let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let divProductos = document.getElementById('productos');






let compras = [];
compras[0] = new Compra("Alfombra Catania", 2600);
compras[1] = new Compra("Alfombra Ciparicia", 16000);
compras[2] = new Compra("Alfombra Redonda", 7400);
compras[3] = new Compra("Alfombra Berlina", 5600);

//Trae datos del storage o los carga
localStorage.getItem('Compra') ? compras = JSON.parse(localStorage.getItem('Compra')) : localStorage.setItem('Compra', JSON.stringify(compras));


//Muestra los productos cargadon en el carrito 
buttonCarrito.addEventListener('click', () => {
    let totalCarrito = 0
    divCarrito.innerHTML = "";
    compras.forEach((productoSeleccionado, indice) => {
        let { nombre, cantidad, precio } = productoSeleccionado;

        if (productoSeleccionado.cantidad != 0) {
            totalCarrito += calcularTotal(precio, cantidad);
            divCarrito.innerHTML += ` 
            <div class="card" id="producto${indice}" style="width: 18rem;">
                <div class="card-body">
                    <p>Producto: ${nombre} </p>
                    <p>Cantidad: ${cantidad}</p>
                    <p>Precio: ${calcularTotal(precio, cantidad)}</p>
                    <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                </div>
            </div>`

        }
    })


    totalCarrito > 0 ? divCarrito.innerHTML += `<p> El precio total es: ${totalCarrito}</p>` : carroVacío();

    eliminarProductos(compras, totalCarrito);
})

