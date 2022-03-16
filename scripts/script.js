
const producto1 = new Producto(1, "Alfombra Catania", 2600, "crudo", "60x110cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/img_20210901_1433301-942d783746371f32a816305177177003-1024-1024.jpg")
const producto2 = new Producto(2, "Alfombra Ciparicia", 16000, "rombo negro", "120x200cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/img_20210901_1642151-834f2ca185c47fdc9816305330689023-320-0.jpg")
const producto3 = new Producto(3, "Alfombra Redonda", 7400, "crudo", "150cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/inshot_20210901_1429070661-9f2d2d656783f28f4916305174501061-320-0.jpg")
const producto4 = new Producto(4, "Alfombra Berlina", 5600, "lineas grises", "90x110cm", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/293/182/products/inshot_20210602_004027557-021-660a7b1d89031ca84b16305197621548-320-0.jpeg")

const productos = [producto1, producto2, producto3, producto4];

let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let button1 = document.getElementById('btn1');
let button2 = document.getElementById('btn2');
let button3 = document.getElementById('btn3');
let button4 = document.getElementById('btn4');

let compras = [];
compras[0] = new Compra("Alfombra Catania", 2600);
compras[1] = new Compra("Alfombra Ciparicia", 16000);
compras[2] = new Compra("Alfombra Redonda", 7400);
compras[3] = new Compra("Alfombra Berlina", 5600);

if (localStorage.getItem('Compra')) {
    compras = JSON.parse(localStorage.getItem('Compra'))
    console.log(compras)
} else {
    localStorage.setItem('Compra', JSON.stringify(compras))
}

button1.onclick = () => (compras[0].cantidad++, localStorage.setItem('Compra', JSON.stringify(compras)));
button2.onclick = () => (compras[1].cantidad++, localStorage.setItem('Compra', JSON.stringify(compras)));
button3.onclick = () => (compras[2].cantidad++, localStorage.setItem('Compra', JSON.stringify(compras)));
button4.onclick = () => (compras[3].cantidad++, localStorage.setItem('Compra', JSON.stringify(compras)));


buttonCarrito.addEventListener('click', () => {

    let arrayStorage = JSON.parse(localStorage.getItem('Compra'));
    divCarrito.innerHTML = ""
    arrayStorage.forEach((productoSeleccionado, indice) => {
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
    function escuchadorDeBotones() {
        arrayStorage.forEach((productoSeleccionado, indice) => {
            if (productoSeleccionado.cantidad > 0) {
                console.log(productoSeleccionado)
                document.getElementById(`boton${indice}`).addEventListener('click', () => {
                    productoSeleccionado.cantidad -= 1;
                    divCarrito.innerHTML = ""
                    arrayStorage.forEach((productoSeleccionado, indice) => {
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
                    localStorage.setItem('Compra', JSON.stringify(arrayStorage));
                    compras=arrayStorage;
                    escuchadorDeBotones();
                })
            }

        })
    }

    escuchadorDeBotones()
})
