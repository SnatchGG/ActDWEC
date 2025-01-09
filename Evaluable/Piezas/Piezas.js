
/*El programa solo deja crear piezas que no existen, tampoco se puede modificar el número de pieza para evitar duplicados y para evitar que una pieza pueda estar en diferentes pedidos, cumpliendo así las condiciones:
    Cada pieza tiene un número único.
    Una pieza no puede pertenecer a varios pedidos.
*/

export default class Piezas {
    constructor(numPieza, numPedido, largo, ancho, grosor, color, ambasCaras, cortada){
        this.numPieza = numPieza;
        this.numPedido = numPedido;
        this.largo = largo;
        this.ancho = ancho;
        this.grosor = grosor;
        this.color = color;
        this.ambasCaras = ambasCaras;
        this.cortada = cortada;
    }
}


