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
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.cantidad = 0;
        this.precioFinal = precio;
    }
    
    // calcularTotal(propiedad) {
    //     return this.reduce((acumulador, elemento) => acumulador + (elemento[propiedad] || 0), 0);
    // }
}
const producto1 = new Producto(1, "Alfombra Catania", 2600, "crudo", "60x110cm")
const producto2 = new Producto(2, "Alfombra Ciparicia", 16000, "rombo negro", "120x200cm")
const producto3 = new Producto(3, "Alfombra Redonda", 7400, "crudo", "150cm")
const producto4 = new Producto(4, "Alfombra Berlina", 5600, "lineas grises", "90x110cm")

const productos = [producto1, producto2, producto3, producto4];

let button1 = document.getElementById('btn1');
let button2 = document.getElementById('btn2');
let button3 = document.getElementById('btn3');
let button4 = document.getElementById('btn4');

const compras = new Array();

button1.addEventListener('click', () => {
    compras[0] = new Compra((productos[0].nombre), (productos[0].precio));
    compras[0].cantidad++;
});
button2.onclick = () => (compras[1] = new Compra((productos[1].nombre), (productos[1].precio)), compras[1].cantidad++);
button3.onclick = () =>(compras[2] = new Compra((productos[2].nombre), (productos[2].precio)), compras[2].cantidad++);
button4.onclick = () =>(compras[3] = new Compra((productos[3].nombre), (productos[3].precio)), compras[3].cantidad++);


console.log(compras)
const sumall = compras.map(item => item.precioFinal).reduce((prev, curr) => prev + curr, 0);
console.log(sumall)
//let cantidad=menu();
//carrito=mostrarCarrito(cantidad,productos);
//console.log(carrito);
//const sumall = carrito.map(item => item.precioFinal).reduce((prev, curr) => prev + curr, 0);
//console.log(sumall);

/*function menu(){
    const seleccion= new Array(productos.length);
    reiniciarCarrito(seleccion);
    var termina = false;
    while(!termina){
        let opc=parseInt(prompt("Elija un producto: 1-Catania 2-Ciparicia 3-Redonda 4-Berlina"));
        if(opc >=1 && opc<=4){
            seleccion[opc-1]++;
        }else{
            alert(`${opc} no es una opción válida`);
        }
        sigue=prompt("¿Desea seguir comprando? si/no");
        if (sigue=="no") {
            termina=true;
        }
    }
    console.log(seleccion)
    return seleccion;
}


function mostrarCarrito(cantidades, productos) {
    const compras =new Array();
    let j=0;
    for (let i = 0; i < cantidades.length; i++) {
        if(cantidades[i]==0){
            continue
        }
        compras[j]= new Compra ((cantidad[i]),(productos[i].nombre),(productos[i].precio)); 
        j++;
        //console.log(`${productos[i].nombre}, tamaño: ${productos[i].tamanio} cantidad: ${carrito[i]} precio: ${productos[i].precio * carrito[i]}`);
    }
    return compras;
}
function reiniciarCarrito(carrito){
    for (let i = 0; i < carrito.length; i++) {
        carrito[i]=0;
    }
}
*/