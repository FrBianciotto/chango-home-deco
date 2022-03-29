class Producto {
    constructor(id, nombre, precio, color, tamanio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tamanio = tamanio;
        this.imagen=imagen;
    }
}

class Compra {
    constructor(nombre,precio) {
        this.nombre = nombre;
        this.cantidad=0;
        this.precio=precio;
    }
    
}

