class Producto{
    constructor(id, nombre,precio, color, tamanio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tamanio = tamanio;
    }
}
class Compra{
    constructor(cantidad,nombre, precio){
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precioFinal=precio*this.cantidad;
    }
    calcularTotal(propiedad){
        return this.reduce((acumulador, elemento) => acumulador + (elemento[propiedad] || 0), 0);
    }
}
const producto1 = new Producto(1,"Alfombra Catania", 2600,"crudo","60x110cm")
const producto2 = new Producto(2,"Alfombra Ciparicia", 16000,"rombo negro","120x200cm")
const producto3 = new Producto(3,"Alfombra Redonda", 7400,"crudo","150cm")
const producto4 = new Producto(4,"Alfombra Berlina", 5600,"lineas grises","90x110cm")

const productos=[producto1,producto2,producto3,producto4]
let cantidad=menu();
carrito=mostrarCarrito(cantidad,productos);
console.log(carrito);
const sumall = carrito.map(item => item.precioFinal).reduce((prev, curr) => prev + curr, 0);
console.log(sumall);


function menu(){
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
