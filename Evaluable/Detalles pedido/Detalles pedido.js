if (localStorage.getItem("piezasAlmacenadas") == null) {
    localStorage.setItem("piezasAlmacenadas", "[]");
}

let listaPiezasDetalles = JSON.parse(localStorage.getItem
    ("piezasAlmacenadas"));


function piezasConsulta(numePedido) {
    if (listaPiezasDetalles.some( e => e.numPedido == numePedido)) {
        return true;
    }
    else {
        return false;
    }
}

function consultaPedido() {
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");

    resultado.setAttribute("id", "resultado");
    
    if(document.getElementById("resultado")){
        document.getElementById("resultado").remove();
    }

    if (piezasConsulta(inputConsulta)) {
        let listaDefinitiva = listaPiezasDetalles.filter(e => e.numPedido == inputConsulta);

        let ths = ["Nº de pieza", "Largo", "Ancho", "Grosor", "Color", "Superficie en m2" ,"Volumen en m3"];

        let tabla = document.createElement("table");
        let trth = document.createElement("tr");

        contenedorPedidos.appendChild(resultado);
        resultado.appendChild(tabla);
        tabla.appendChild(trth);

        for (let i = 0; i < ths.length; i++) {
            let th = document.createElement("th");
            th = document.createElement("th");
            th.innerText = ths[i];
            trth.appendChild(th);
        }

        for (let i = 0; i < listaDefinitiva.length; i++) {
            //Se crean los tr que dependen del número de pedidos que vayamos a mostrar.
            let tr = document.createElement("tr");
            tr.setAttribute ("id", "tr"+i);
            tabla.appendChild(tr);

            for(let j = 0; j < ths.length; j++){
                let td = document.createElement("td");
                td.setAttribute("id","td" + i + j);
                tr.appendChild(td);
            }

            let superficie = (listaDefinitiva[i].largo * listaDefinitiva[i].ancho)/100;

            let volumen = (listaDefinitiva[i].largo * listaDefinitiva[i].ancho * listaDefinitiva[i].grosor)/1000000;

            //Se introducen los datos en la tabla. Cada id del tr y de los td se personaliza con el +i y el +i+j para tener una referencia y poder insertar los datos obteniendo la posición fila-columna en la tabla. Al juntar 0, 1, 2,... se obtiene la posición en la tabla,(la misma que se obtiene en el for anterior con "td"+i+j)
            document.getElementById("td"+i+0).innerText = listaDefinitiva[i].numPieza;
            document.getElementById("td"+i+1).innerText = listaDefinitiva[i].largo;
            document.getElementById("td"+i+2).innerText = listaDefinitiva[i].ancho;
            document.getElementById("td"+i+3).innerText = listaDefinitiva[i].grosor;
            document.getElementById("td"+i+4).innerText = listaDefinitiva[i].color;
            document.getElementById("td"+i+5).innerText = superficie;
            document.getElementById("td"+i+6).innerText = volumen;
        }
    }
    else {
        resultado.innerText = "NO HAY PIEZAS CON ESE NÚMERO DE PEDIDO";
        resultado.style.marginTop = "2%";
        resultado.style.textAlign = "center";
        resultado.style.fontSize = "1.5em";
        resultado.style.color = "red";
        contenedorPedidos.appendChild(resultado);
    }
    
    document.getElementById("nConsulta").value = "";
    
}

let contenedorPedidos = document.getElementById("contenedorPedidos");
let botonConsulta = document.getElementById("botonConsulta");
botonConsulta.addEventListener("click", function () {
    consultaPedido();
});





