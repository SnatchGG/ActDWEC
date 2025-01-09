export default class Pedidos {
    constructor(numPedido, clienteNombre, clienteApellido, fechaPedido, procesado, servido){ 
            this.numPedido = numPedido;
            this.cliente = new Object();
            this.cliente.nombre = clienteNombre;
            this.cliente.apellido = clienteApellido;
            this.fechaPedido = fechaPedido;
            this.procesado = procesado;
            this.servido = servido;
    }
}
