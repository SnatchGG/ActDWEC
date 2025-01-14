import Pedidos from "./Pedidos.js";
import aviso from "../Funciones comunes/funcionesComunes.js";
import { avisar, buscarPedido } from "../Funciones comunes/funcionesComunes.js";

let listaPedidosAlmacenados = JSON.parse(localStorage.getItem("pedidosAlmacenados"));

if (localStorage.getItem("pedidosAlmacenados") == null) {
    localStorage.setItem("pedidosAlmacenados", "[]");
}

function comprobarNumero(numPedido) {
    if (document.getElementById("aviso")) {
        document.getElementById("aviso").remove();
    }
    if (numPedido < 1) {
        aviso("Número es incorrecto.");
        return false;
    }
    else if (isNaN(numPedido)) {
        aviso("El pedido tiene que ser un número sin letras.");
        return false;
    }
    else if (numPedido % 1 != 0) {
        aviso("El número no puede tener decimales.");
        return false;
    }
    else if (buscarPedido(numPedido)) {
        aviso("El pedido ya existe");
        return false;
    }
    else {
        return true;
    }
}

function comprobarFecha(fecha) {
    if (document.getElementById("aviso")) {
        document.getElementById("aviso").remove();
    }
    let fechaActual = new Date();
    let fechaAux = fecha.split("/");

    if (isNaN(fechaAux[0]) || isNaN(fechaAux[1]) || isNaN(fechaAux[2])) {
        aviso("Fecha con formato incorrecto, formato correcto: dd/mm/aaaa.");
        return false;
    }
    else if ((fechaAux[0] < 1 || fechaAux[0] > 31) || (fechaAux[1] <= 0 || fechaAux[1] > 12) || (fechaAux[2] <= 1980 || fechaAux[2] > fechaActual.getFullYear())) {
        aviso("Los valores de las fechas se salen de rango.");
        return false;
    }
    else
        return true;
}

function obtenerPedido(nPedido) {
    return listaPedidosAlmacenados.find(e => e.numPedido == nPedido);
}


let contenedorPedidos = document.getElementById("contenedorPedidos");
let botonAceptar = document.createElement("button");
let botonCancelar = document.createElement("button");

function altaPedido() {
    if (document.getElementById("aviso")) {
        document.getElementById("aviso").remove();
    }

    let inputNumeroPedido = document.getElementById("nPedido").value;
    let inputNombreCliente = document.getElementById("cNombre").value;
    let inputApellidoCliente = document.getElementById("cApellido").value;
    let inputFecha = document.getElementById("fecha").value;
    let inputProcesado = document.getElementById("procesado").value;
    let inputServido = document.getElementById("servido").value;
    let nuevoPedido;

    if (comprobarNumero(inputNumeroPedido) && comprobarFecha(inputFecha) && inputProcesado != "" && inputServido != "") {
        nuevoPedido = new Pedidos(parseInt(inputNumeroPedido), inputNombreCliente, inputApellidoCliente, inputFecha, inputProcesado, inputServido);


        listaPedidosAlmacenados.push(nuevoPedido);
        localStorage.setItem("pedidosAlmacenados", JSON.stringify(listaPedidosAlmacenados));

        aviso("Pedido añadido.");
    }
    else
        aviso("Revisa los datos, el pedido no se ha añadido.");

    document.getElementById("nPedido").value = "";
    document.getElementById("cNombre").value = "";
    document.getElementById("cApellido").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("procesado").value = "";
    document.getElementById("servido").value = "";
}

function consultaPedido() {
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");
    resultado.setAttribute("id", "resultado");

    if (document.getElementById("resultado")) {
        document.getElementById("resultado").remove();
    }

    if (buscarPedido(inputConsulta)) {
        let pedido = listaPedidosAlmacenados.filter(e => e.numPedido == inputConsulta);

        let tabla = document.createElement("table");
        let tr = document.createElement("tr");
        let tr1 = document.createElement("tr");

        let ths = ["Número de Pedido", "Nombre", "Apellido", "Fecha", "Procesado", "Servido"];

        for (let i = 0; i < ths.length; i++) {
            let th = document.createElement("th");
            th.innerText = ths[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < pedido.length; i++) {
            let td = document.createElement("td");
            td.innerText = pedido[i].numPedido;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pedido[i].cliente.nombre;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pedido[i].cliente.apellido;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pedido[i].fechaPedido;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pedido[i].procesado;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pedido[i].servido;
            tr1.appendChild(td);
        }

        contenedorPedidos.appendChild(resultado);
        resultado.appendChild(tabla);
        tabla.appendChild(tr);
        tabla.appendChild(tr1);
    }

    else {
        avisar("EL PEDIDO NO EXISTE", resultado);
    }

    document.getElementById("nConsulta").value = "";
}

function modificarPedido() {
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");

    resultado.setAttribute("id", "resultado");

    if (document.getElementById("resultado")) {
        document.getElementById("resultado").remove();
    }

    if (buscarPedido(inputConsulta)) {
        let i1 = document.createElement("input");
        let i2 = document.createElement("input");
        let i3 = document.createElement("input");
        let i4 = document.createElement("select");
        let i5 = document.createElement("select");

        i1.setAttribute("id", "modificaNombreCliente");
        i1.setAttribute("input", "text");
        i1.setAttribute("placeholder", "Nombre del cliente...");
        i2.setAttribute("id", "modificaNombreApellido");
        i2.setAttribute("input", "text");
        i2.setAttribute("placeholder", "Apellido del cliente...");
        i3.setAttribute("id", "modificaFechaPedido");
        i3.setAttribute("input", "text");
        i3.setAttribute("placeholder", "Fecha del pedido...");
        i4.setAttribute("id", "modificaProcesado");
        i5.setAttribute("id", "modificaServido");

        let option1 = document.createElement("option");
        option1.innerText = "Indica si está procesado";
        option1.setAttribute("value", "");
        i4.appendChild(option1);

        option1 = document.createElement("option");
        option1.innerText = "Si";
        option1.setAttribute("value", "Si");
        i4.appendChild(option1);

        option1 = document.createElement("option");
        option1.innerText = "No";
        option1.setAttribute("value", "No");
        i4.appendChild(option1);

        option1 = document.createElement("option");
        option1.innerText = "Indica si está servido";
        option1.setAttribute("value", "");
        i5.appendChild(option1);

        option1 = document.createElement("option");
        option1.innerText = "Si";
        option1.setAttribute("value", "Si");
        i5.appendChild(option1);

        option1 = document.createElement("option");
        option1.innerText = "No";
        option1.setAttribute("value", "No");
        i5.appendChild(option1);

        
        botonAceptar.setAttribute("id", "aceptar");
        botonCancelar.setAttribute("id", "cancelar");

        contenedorPedidos.appendChild(resultado);

        resultado.style.marginTop = "2%";
        resultado.style.textAlign = "center";
        botonAceptar.innerText = "Aceptar";
        botonCancelar.innerText = "Cancelar";
        botonAceptar.style.marginLeft = "2%"
        botonCancelar.style.marginLeft = "2%"

        resultado.appendChild(i1);
        resultado.appendChild(i2);
        resultado.appendChild(i3);
        resultado.appendChild(i4);
        resultado.appendChild(i5);
        resultado.appendChild(botonAceptar);
        resultado.appendChild(botonCancelar);

        let elementoBotonAcep = document.getElementById("aceptar");
        let elementoBotonCanc = document.getElementById("cancelar");

        elementoBotonAcep.addEventListener("click", function () {
            let pedidoModficar = obtenerPedido(inputConsulta);

            if (document.getElementById("modificaNombreCliente").value != "") {
                pedidoModficar.cliente.nombre = document.getElementById("modificaNombreCliente").value;
            }

            if (document.getElementById("modificaNombreApellido").value != "") {
                pedidoModficar.cliente.apellido = document.getElementById("modificaNombreApellido").value;
            }

            if (document.getElementById("modificaFechaPedido").value != "") {
                if (comprobarFecha(document.getElementById("modificaFechaPedido").value)) {
                    pedidoModficar.fechaPedido = document.getElementById("modificaFechaPedido").value;
                }
            }

            if (document.getElementById("modificaProcesado").value != "") {
                pedidoModficar.procesado = document.getElementById("modificaProcesado").value;
            }

            if (document.getElementById("modificaServido").value != "") {
                pedidoModficar.servido = document.getElementById("modificaServido").value;
            }

            localStorage.setItem("pedidosAlmacenados", JSON.stringify(listaPedidosAlmacenados));

            if (document.getElementById("resultado")) {
                document.getElementById("resultado").remove();
            }
        });

        elementoBotonCanc.addEventListener("click", function () { document.getElementById("resultado").remove(); });
    }
    else {
        avisar("EL PEDIDO NO EXISTE", resultado);
    }

    document.getElementById("nConsulta").value = "";
}

function bajaPedido() {    
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");
    resultado.setAttribute("id", "resultado");

    if (document.getElementById("resultado")) {
        document.getElementById("resultado").remove();
    }

    if (buscarPedido(inputConsulta)) {
        
        //Se asigna un número de pedido = 0 a las piezas cuando se borra su pedido
        let aux = JSON.parse(localStorage.getItem("piezasAlmacenadas"));

        if (localStorage.getItem("piezasAlmacenadas") == null) {
            localStorage.setItem("piezasAlmacenadas", "[]");
        }
    
        let piezasParaActualizar = aux.filter(e => e.numPedido == inputConsulta);
    
        aux = aux.filter(e => e.numPedido != inputConsulta);
        localStorage.setItem("piezasAlmacenadas",JSON.stringify(aux));
    
        piezasParaActualizar.forEach(element => {
            element.numPedido = 0;
        });
    
        for(let i = 0; i < piezasParaActualizar.length; i++){
            aux.push(piezasParaActualizar[i]);
        }
    
        localStorage.setItem("piezasAlmacenadas",JSON.stringify(aux));
        //*************************************************************************

        listaPedidosAlmacenados = listaPedidosAlmacenados.filter(e => e.numPedido != inputConsulta);

        localStorage.setItem("pedidosAlmacenados", JSON.stringify(listaPedidosAlmacenados));
     
        resultado.style.textAlign = "center";
        resultado.style.marginTop = "2%";
        resultado.style.fontSize = "1.5em";
        resultado.style.color = "black";
        resultado.innerHTML = "EL PEDIDO " + inputConsulta + " SE HA DADO DE BAJA";
        contenedorPedidos.appendChild(resultado);
    }
    else {
        avisar("EL PEDIDO NO EXISTE", resultado);
    }

    document.getElementById("nConsulta").value = "";
}


let botonAlta = document.getElementById("altaclick");
let botonConsulta = document.getElementById("consultarclick");
let botonModificar = document.getElementById("modificarclick");
let botonBaja = document.getElementById("bajaclick");

botonAlta.addEventListener("click", function () { altaPedido() });
botonConsulta.addEventListener("click", function () { consultaPedido() });
botonModificar.addEventListener("click", function () { modificarPedido() });
botonBaja.addEventListener("click", function () { bajaPedido() });


