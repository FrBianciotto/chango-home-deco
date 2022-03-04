class Producto {
    constructor(id, nombre, precio, color, tamanio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tamanio = tamanio;
    }
}
class Compra {
    constructor(nombre,precio) {
        this.nombre = nombre;
        this.cantidad=0;
        this.precio=precio;
    }
    contar(){
        this.cantidad+=1;
    }
    calcularTotal() {
        this.precio *= this.cantidad;
    }
}
const producto1 = new Producto(1, "Alfombra Catania", 2600, "crudo", "60x110cm")
const producto2 = new Producto(2, "Alfombra Ciparicia", 16000, "rombo negro", "120x200cm")
const producto3 = new Producto(3, "Alfombra Redonda", 7400, "crudo", "150cm")
const producto4 = new Producto(4, "Alfombra Berlina", 5600, "lineas grises", "90x110cm")

const productos = [producto1, producto2, producto3, producto4];

let buttonCarrito=document.getElementById('mostrarCarrito');
let divCarrito=document.getElementById('carrito');
let button1 = document.getElementById('btn1');
let button2 = document.getElementById('btn2');
let button3 = document.getElementById('btn3');
let button4 = document.getElementById('btn4');

const compras = new Array();

compras[0] = new Compra("Alfombra Catania",2600);
compras[1] = new Compra("Alfombra Ciparicia",16000);
compras[2] = new Compra("Alfombra Redonda",7400);
compras[3] = new Compra("Alfombra Berlina",5600);

button1.onclick = () => (compras[0].contar());
button2.onclick = () => (compras[1].contar());
button3.onclick = () =>(compras[2].contar());
button4.onclick = () =>(compras[3].contar());

buttonCarrito.addEventListener('click', ()=>{
    divCarrito.innerHTML ="" 
    compras.forEach((productoSeleccionado, indice)=>{
        if (productoSeleccionado.cantidad != 0) {
            productoSeleccionado.calcularTotal();
            divCarrito.innerHTML += ` 
            <div class="card" id="producto${indice}" style="width: 18rem;">
                <div class="card-body">
                    <p>Producto: ${productoSeleccionado.nombre} </p>
                    <p>Cantidad: ${productoSeleccionado.cantidad}</p>
                    <p>Precio: ${productoSeleccionado.precio}</p>
                </div>
            </div>` 
        }
    })
})