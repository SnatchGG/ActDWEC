if (localStorage.getItem("pedidosAlmacenados") == null) {
    localStorage.setItem("pedidosAlmacenados", "[]");
}

let listaAlmacenada = JSON.parse(localStorage.getItem("pedidosAlmacenados"));

//Tabla de ejemplo, si hay pedidos guardados se cargan.

let tablaPedidos = document.createElement("table");
let tr = document.createElement("tr");
let td;

let ths = ["Número de Pedido", "Nombre", "Apellido", "Fecha", "Procesado", "Servido"];

let divTabla = document.getElementById("tabla");

if(listaAlmacenada.length == 0)
    divTabla.remove();

divTabla.appendChild(tablaPedidos);
tablaPedidos.appendChild(tr);

for (let i = 0; i < ths.length; i++) {
    let th = document.createElement("th");
    
    th.innerText = ths[i];    
    tr.appendChild(th);
}

for (let i = 0; i < listaAlmacenada.length; i++) {
    tr = document.createElement("tr");
    tablaPedidos.appendChild(tr);

    td = document.createElement("td");
    td.innerHTML = listaAlmacenada[i].numPedido;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = listaAlmacenada[i].cliente.nombre;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = listaAlmacenada[i].cliente.apellido;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = listaAlmacenada[i].fechaPedido;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = listaAlmacenada[i].procesado;
    tr.appendChild(td)

    td = document.createElement("td");
    td.innerText = listaAlmacenada[i].servido;
    tr.appendChild(td);
}







