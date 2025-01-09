export default function aviso(mensaje) {
    let aviso = document.createElement("div");
    aviso.setAttribute("id", "aviso");
    aviso.innerText = mensaje;
    aviso.style.marginTop = "2%";
    aviso.style.textAlign = "center";
    aviso.style.fontSize = "1.5em";
    aviso.style.color = "red"; 
    document.getElementById("datos").appendChild(aviso);
}

export function avisar(mensaje, elemento){
    elemento.innerText =  mensaje;
    elemento.style.textAlign = "center";
    elemento.style.marginTop = "2%";
    elemento.style.color = "red";
    elemento.style.fontSize = "1.5em";
    contenedorPedidos.appendChild(elemento);
}

export function buscarPedido(nPedido) {
    let listaPed = JSON.parse(localStorage.getItem("pedidosAlmacenados"));

    return listaPed.some(e => e.numPedido == nPedido);
}

export function buscarPieza(nPieza) {
    let listaPie = JSON.parse(localStorage.getItem ("piezasAlmacenadas"));

    return listaPie.some(e => e.numPieza == nPieza);
}
