let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let divProductos = document.getElementById('productos');
const alfombras = document.getElementById('alfombras')
const maderas = document.getElementById('madera')

let compras = [];
//llamado de la funcion que trae los productos desde el JSON
let productos = cargarProductos();

productos.then(data => {
    data.forEach((p, indice) => {
        //Carga de todas las cards en la seccion
        divProductos.innerHTML += `
            <div id="producto${p.id}" class="card card-producto mt-2 col-md-3" >
                    <img src="${p.imagen}" class="card-img-top mt-2"  alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Color: ${p.color}.</p>
                        <p class="card-text">Tamaño: ${p.tamanio}.</p>
                        <p class="card-text">Precio: $${p.precio}</p>
                        <button id="btn_${p.id}" href="#" class="btn btn-primary btn-agregar">Añadir al carrito</button>
                    </div>
            </div>`;
        compras[indice] = new Compra(p.nombre, p.precio, p.imagen)
        

    });

    //Trae datos del storage o los carga
    localStorage.getItem('Compra') ? compras = JSON.parse(localStorage.getItem('Compra')) : localStorage.setItem('Compra', JSON.stringify(compras));

    const buttons = document.getElementsByClassName("btn-agregar");
    for (const btn of buttons) {
        btn.onclick = () => sumarProducto(btn.id.split('_')[1]);
    }


    alfombras.onclick = () => {
        cargarHTML(data.filter(producto => { return producto.tipo == "alfombra" }))
    }
    maderas.onclick = () => {
        cargarHTML(data.filter(producto => { return producto.tipo == "madera" }))
    }
})


let cargarHTML = (arrayTipo) => {
    divProductos.innerHTML = "";
    arrayTipo.forEach((p) => {

        //Carga de todas las cards en la seccion
        divProductos.innerHTML += `
            <div id="producto${p.id}" class="card card-producto mt-2 col-md-3" >
                    <img src="${p.imagen}" class="card-img-top mt-2"  alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Color: ${p.color}.</p>
                        <p class="card-text">Tamaño: ${p.tamanio}.</p>
                        <p class="card-text">Precio: $${p.precio}</p>
                        <button id="btn_${p.id}" href="#" class="btn btn-primary btn-agregar">Añadir al carrito</button>
                    </div>
            </div>`;


    });
}




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

})

