
// const producto1 = new Producto(1, "Alfombra Catania", 2600, "crudo", "60x110cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/img_20210901_1433301-942d783746371f32a816305177177003-1024-1024.jpg")
// const producto2 = new Producto(2, "Alfombra Ciparicia", 16000, "rombos negros", "120x200cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/img_20210901_1642151-834f2ca185c47fdc9816305330689023-320-0.jpg")
// const producto3 = new Producto(3, "Alfombra Redonda", 7400, "crudo", "150cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/inshot_20210901_1429070661-9f2d2d656783f28f4916305174501061-320-0.jpg")
// const producto4 = new Producto(4, "Alfombra Berlina", 5600, "lineas grises", "90x110cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/inshot_20210602_004027557-021-660a7b1d89031ca84b16305197621548-320-0.jpeg")

// const productos = [producto1, producto2, producto3, producto4];


let productos = cargarProductos();
productos.then( data => {
    data.forEach((p) => {
        divProductos.innerHTML += `
            <div id="producto${p.id}" class="card" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top"  alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Color: ${p.color}.</p>
                        <p class="card-text">Tamaño: ${p.tamanio}.</p>
                        <p class="card-text">Precio: $${p.precio}.</p>
                        <button id="btn${p.id}" href="#" class="btn btn-primary">Añadir al carrito</button>
                    </div>
            </div>

        `
    }); 

})

let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let divProductos = document.getElementById('productos');
let button1 = document.getElementById('btn1');
let button2 = document.getElementById('btn2');
let button3 = document.getElementById('btn3');
let button4 = document.getElementById('btn4');

console.log(button1)
//Carga de las cards de productos en el DOM
// for (let p of productos) {

//     divProductos.innerHTML += `
//         <div id="producto${p.id}" class="card" style="width: 18rem;">
//                 <img src="${p.imagen}" class="card-img-top"  alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">${p.nombre}</h5>
//                     <p class="card-text">Color: ${p.color}.</p>
//                     <p class="card-text">Tamaño: ${p.tamanio}.</p>
//                     <p class="card-text">Precio: $${p.precio}.</p>
//                     <button id="btn${p.id}" href="#" class="btn btn-primary">Añadir al carrito</button>
//                 </div>
//         </div>
  
//     `
// }




let compras = [];
compras[0] = new Compra("Alfombra Catania", 2600);
compras[1] = new Compra("Alfombra Ciparicia", 16000);
compras[2] = new Compra("Alfombra Redonda", 7400);
compras[3] = new Compra("Alfombra Berlina", 5600);

//Trae datos del storage o los carga
localStorage.getItem('Compra') ? compras = JSON.parse(localStorage.getItem('Compra')) : localStorage.setItem('Compra', JSON.stringify(compras));

button1.onclick = () => { compras[0].cantidad++; localStorage.setItem('Compra', JSON.stringify(compras)) };
button2.onclick = () => { compras[1].cantidad++; localStorage.setItem('Compra', JSON.stringify(compras)) };
button3.onclick = () => { compras[2].cantidad++; localStorage.setItem('Compra', JSON.stringify(compras)) };
button4.onclick = () => { compras[3].cantidad++; localStorage.setItem('Compra', JSON.stringify(compras)) };

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

