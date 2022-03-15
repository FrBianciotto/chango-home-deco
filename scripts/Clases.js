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
        let total = this.precio * this.cantidad;
        return total;
    }
}