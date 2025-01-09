import Piezas from "./Piezas.js";
import aviso from "../Funciones comunes/funcionesComunes.js";
import { avisar, buscarPedido , buscarPieza } from "../Funciones comunes/funcionesComunes.js";

let listaPiezasAlmacenadas = JSON.parse(localStorage.getItem
    ("piezasAlmacenadas"));

if (localStorage.getItem("piezasAlmacenadas") == null) {
    localStorage.setItem("piezasAlmacenadas", "[]");
}

function comprobarPieza(numPieza) {
    if (numPieza < 1)
        return false;
    else if (isNaN(numPieza))
        return false;
    else if (numPieza % 1 != 0)
        return false;
    else
        return true;
}

function obtenerPieza(nPieza) {
    return listaPiezasAlmacenadas.find(e => e.numPieza == nPieza);
}

function altaPieza() {
    if (document.getElementById("aviso")) {
        document.getElementById("aviso").remove();
    }

    //He quitado los parseFloat y los parseInt ya que si se introducían caracteres el campo las parseaba y podia seguir introduciendo el dato, era poco realista. Luego se podrán usar estas funciones para algún caso determinado. O se pueden parsear las entradas se introduzcan los valores ya validados sin caracteres.

    let inputNumeroPieza = document.getElementById("nPieza").value;
    let inputNumeroPedido = document.getElementById("nPedido").value;
    let inputLargo = document.getElementById("largo").value;
    let inputAncho = document.getElementById("ancho").value;
    let inputGrosor = document.getElementById("grosor").value;
    let inputColor = document.getElementById("color").value;
    let inputChapeada = document.getElementById("chapeada").value;
    let inputCortada = document.getElementById("cortada").value;

    if (comprobarPieza(inputNumeroPieza) && !buscarPieza(inputNumeroPieza) && buscarPedido(inputNumeroPedido) && inputChapeada != "" && inputColor != "" && inputCortada != "" && inputLargo > 0 && !isNaN(inputLargo) && inputAncho > 0 && !isNaN(inputAncho) && inputGrosor > 0 && !isNaN(inputGrosor)) {

        inputNumeroPieza = parseInt(inputNumeroPieza);
        inputNumeroPedido = parseInt(inputNumeroPedido);
        inputLargo = parseFloat(inputLargo);
        inputAncho = parseFloat(inputAncho);
        inputGrosor = parseFloat(inputGrosor);

        let nuevaPieza = new Piezas(inputNumeroPieza, inputNumeroPedido, inputLargo, inputAncho, inputGrosor, inputColor, inputChapeada, inputCortada);

        listaPiezasAlmacenadas.push(nuevaPieza);
        localStorage.setItem("piezasAlmacenadas", JSON.stringify(listaPiezasAlmacenadas));

        aviso("Pieza añadida.");
    }
    else {
        if (!comprobarPieza(inputNumeroPieza))
            aviso("Número de pieza incorrecto, solo números");
        else if (buscarPieza(inputNumeroPieza))
            aviso("La pieza ya existe");
        else if (!buscarPedido(inputNumeroPedido))
            aviso("El pedido no existe");
        else if (inputLargo <= 0)
            aviso("Largo tiene que ser mayor que 0");
        else if (isNaN(inputLargo))
            aviso("No se admiten letras en el largo o campo vacío");
        else if (inputAncho <= 0)
            aviso("Ancho tiene que ser mayor que 0");
        else if (isNaN(inputAncho))
            aviso("No se admiten letras en el ancho o campo vacío");
        else if (inputGrosor <= 0)
            aviso("Grosor tiene que ser mayor que 0");
        else if (isNaN(inputGrosor))
            aviso("No se admiten letras en el grosor o campo vacío");
        else if (inputColor == "")
            aviso("Pon un color");
        else if (inputChapeada == "")
            aviso("Selecciona Si o No en Chapeada");
        else if (inputCortada == "")
            aviso("Selecciona Si o No en Cortada");
    }

    document.getElementById("nPieza").value = "";
    document.getElementById("nPedido").value = "";
    document.getElementById("largo").value = "";
    document.getElementById("ancho").value = "";
    document.getElementById("grosor").value = "";
    document.getElementById("color").value = "";
    document.getElementById("chapeada").value = "";
    document.getElementById("cortada").value = "";
}

function consultaPieza() {
    let contenedorPedidos = document.getElementById("contenedorPedidos");
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");
    resultado.setAttribute("id", "resultado");

    if (document.getElementById("resultado")) {
        document.getElementById("resultado").remove();
    }

    if (document.getElementById("aviso"))
        document.getElementById("aviso").remove();

    if (buscarPieza(inputConsulta)) {
        let pieza = listaPiezasAlmacenadas.filter(e => e.numPieza == inputConsulta);

        let tabla = document.createElement("table");
        let tr = document.createElement("tr");
        let tr1 = document.createElement("tr");

        let ths = ["Nº de pieza", "Nº de pedido", "Largo(cm)", "Ancho(cm)", "Grosor(cm)", "Color", "Chapeada", "Cortada"];

        for (let i = 0; i < ths.length; i++) {
            let th = document.createElement("th");
            th.innerText = ths[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < pieza.length; i++) {
            let td = document.createElement("td");
            td.innerText = pieza[i].numPieza;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].numPedido;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].largo;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].ancho;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].grosor;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].color;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].ambasCaras;
            tr1.appendChild(td);

            td = document.createElement("td");
            td.innerText = pieza[i].cortada;
            tr1.appendChild(td);
        }

        contenedorPedidos.appendChild(resultado);
        resultado.appendChild(tabla);
        tabla.appendChild(tr);
        tabla.appendChild(tr1);
    }
    else {
        avisar("LA PIEZA NO EXISTE", resultado);
    }

    document.getElementById("nConsulta").value = "";
}

function modificarPieza() {
    let contenedorPedidos = document.getElementById("contenedorPedidos");
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");
    let aviso = document.createElement("div");

    resultado.setAttribute("id", "resultado");
    aviso.setAttribute("id", "aviso");

    if (document.getElementById("resultado"))
        document.getElementById("resultado").remove();

    if (document.getElementById("aviso"))
        document.getElementById("aviso").remove();

    if (buscarPieza(inputConsulta)) {
        let i1 = document.createElement("input");
        let i2 = document.createElement("input");
        let i3 = document.createElement("input");
        let i4 = document.createElement("input");

        i1.setAttribute("id", "modificaNumeroPedido");
        i1.setAttribute("input", "text");
        i1.setAttribute("placeholder", "Número de pedido...");
        i2.setAttribute("id", "modificaLargo");
        i2.setAttribute("input", "text");
        i2.setAttribute("placeholder", "Largo..");
        i3.setAttribute("id", "modificaAncho");
        i3.setAttribute("input", "text");
        i3.setAttribute("placeholder", "Ancho...");
        i4.setAttribute("id", "modificaGrosor");
        i4.setAttribute("input", "text");
        i4.setAttribute("placeholder", "Grosor...");

        let i5 = document.createElement("select");
        let o1 = document.createElement("option");
        let o2 = document.createElement("option");
        let o3 = document.createElement("option");
        let o4 = document.createElement("option");
        let o5 = document.createElement("option");
        let o6 = document.createElement("option");
        let o7 = document.createElement("option");
        let o8 = document.createElement("option");

        i5.setAttribute("id", "modificaColor");
        o1.setAttribute("value", "");
        o1.setAttribute("class", "colornonatural");
        o1.innerText = "Indica el color";
        o2.setAttribute("value", "Natural");
        o2.setAttribute("id", "modificaColornatural");
        o2.innerText = "Natural";
        o3.setAttribute("value", "Rojo");
        o3.setAttribute("class", "colornonatural");
        o3.innerText = "Rojo";
        o4.setAttribute("value", "Azul");
        o4.setAttribute("class", "colornonatural");
        o4.innerText = "Azul";
        o5.setAttribute("value", "Verde");
        o5.setAttribute("class", "colornonatural");
        o5.innerText = "Verde";
        o6.setAttribute("value", "Gris");
        o6.setAttribute("class", "colornonatural");
        o6.innerText = "Gris";
        o7.setAttribute("value", "Marron");
        o7.setAttribute("class", "colornonatural");
        o7.innerText = "Marrón";
        o8.setAttribute("value", "Negro");
        o8.setAttribute("class", "colornonatural");
        o8.innerText = "Negro";

        i5.appendChild(o1);
        i5.appendChild(o2);
        i5.appendChild(o3);
        i5.appendChild(o4);
        i5.appendChild(o5);
        i5.appendChild(o6);
        i5.appendChild(o7);
        i5.appendChild(o8);

        let i6 = document.createElement("select");
        let o9 = document.createElement("option");
        let o10 = document.createElement("option");
        let o11 = document.createElement("option");

        i6.setAttribute("name", "chapeada");
        i6.setAttribute("id", "modificaChapeada");
        o9.setAttribute("value", "");
        o9.innerText = "Indica si está chapeada";
        o10.setAttribute("value", "Si");
        o10.setAttribute("id", "modificacNatural");
        o10.innerText = "Si";
        o11.setAttribute("value", "No");
        o11.setAttribute("id", "modificano");
        o11.innerText = "No";

        i6.appendChild(o9);
        i6.appendChild(o10);
        i6.append(o11);

        let i7 = document.createElement("select");
        let o12 = document.createElement("option");
        let o13 = document.createElement("option");
        let o14 = document.createElement("option");

        i7.setAttribute("name", "cortada");
        i7.setAttribute("id", "modficaCortada");
        o12.setAttribute("value", "");
        o12.innerText = "Indica si está cortada";
        o13.setAttribute("value", "Si");
        o13.innerText = "Si";
        o14.setAttribute("value", "No");
        o14.innerText = "No";

        i7.appendChild(o12);
        i7.appendChild(o13);
        i7.appendChild(o14);

        let botonAceptar = document.createElement("button");
        let botonCancelar = document.createElement("button");
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
        resultado.appendChild(i6);
        resultado.appendChild(i7);
        resultado.appendChild(botonAceptar);
        resultado.appendChild(botonCancelar);

        let elementoBotonAcep = document.getElementById("aceptar");
        let elementoBotonCanc = document.getElementById("cancelar");

        elementoBotonAcep.addEventListener("click", function () {
            let piezaModficar = obtenerPieza(inputConsulta);

            if (buscarPedido(i1.value)) {
                piezaModficar.numPedido = document.getElementById("modificaNumeroPedido").value;
            }
            else if (i1.value == "") { }
            else {
                avisar("El pedido no existe", aviso);
            }

            if (i2.value > 0) {
                piezaModficar.largo = document.getElementById("modficaLargo").value;
            }
            else if (i2.value == "") { }
            else {
                avisar("El largo tiene que ser mayor que 0", aviso);
            }

            if (i3.value > 0) {
                piezaModficar.ancho = document.getElementById("modificaAncho").value;
            }
            else if (i3.value == "") { }
            else {
                avisar("El ancho tiene que ser mayor que 0", aviso);
            }

            if (i4.value > 0) {
                piezaModficar.grosor = document.getElementById("modificaGrosor").value;
            }
            else if (i4.value == "") { }
            else {
                avisar("El grosor tiene que ser mayor que 0", aviso);
            }

            if (document.getElementById("modificaColor").value != "") {
                piezaModficar.color = document.getElementById("modificaColor").value;
            }

            if (document.getElementById("modificaColor").value == "Natural") {
                piezaModficar.color = document.getElementById("modificaColor").value;
                piezaModficar.ambasCaras = "No";
            }

            if (document.getElementById("modificaChapeada").value != "") {
                piezaModficar.ambasCaras = document.getElementById("modificaChapeada").value;
            }

            if (document.getElementById("modficaCortada").value != "") {
                piezaModficar.cortada = document.getElementById("modficaCortada").value;
            }

            localStorage.setItem("piezasAlmacenadas", JSON.stringify(listaPiezasAlmacenadas));

            if (document.getElementById("resultado")) {
                document.getElementById("resultado").remove();
            }
        });

        elementoBotonCanc.addEventListener("click", function () { document.getElementById("resultado").remove(); });

    }
    else {
        avisar("LA PIEZA NO EXISTE", resultado);
    }

    let modificaColorNatural = document.getElementById("modificaColornatural");
    let modificacNatural = document.getElementById("modificacNatural");

    if (modificaColorNatural) {
        modificaColorNatural.addEventListener("click", function () { modificacNatural.remove() });
    }

    function modficarAniadirOption() {
        if ((document.getElementById("modificaChapeada")) && document.getElementById("modificaChapeada").childElementCount == 2) {
            let e = document.createElement("option");
            e.setAttribute("value", "Si");
            e.setAttribute("id", "modificacNatural");
            e.innerHTML = "Si";
            document.getElementById("modificaChapeada").insertBefore(e, document.getElementById("modficano"));
            modificacNatural = document.getElementById("modificacNatural");
        }
    }

    for (let i = 0; i < noNatural.length; i++) {
        noNatural[i].addEventListener("click", function () { modficarAniadirOption() });
    }

    document.getElementById("nConsulta").value = "";
}

function bajaPieza() {
    let contenedorPedidos = document.getElementById("contenedorPedidos");
    let inputConsulta = document.getElementById("nConsulta").value;
    let resultado = document.createElement("div");
    resultado.setAttribute("id", "resultado");

    if (document.getElementById("resultado")) {
        document.getElementById("resultado").remove();
    }

    if (document.getElementById("aviso"))
        document.getElementById("aviso").remove();

    if (buscarPieza(inputConsulta)) {
        listaPiezasAlmacenadas = listaPiezasAlmacenadas.filter(e => e.numPieza != inputConsulta);

        localStorage.setItem("piezasAlmacenadas", JSON.stringify(listaPiezasAlmacenadas));

        resultado.style.textAlign = "center";
        resultado.style.marginTop = "2%";
        resultado.style.fontSize = "1.5em";
        resultado.style.color = "black";
        resultado.innerHTML = "LA PIEZA " + inputConsulta + " SE HA DADO DE BAJA";
        contenedorPedidos.appendChild(resultado);
    }
    else {
        avisar("LA PIEZA NO EXISTE", resultado);
    }

    document.getElementById("nConsulta").value = "";
}

let botonAlta = document.getElementById("altaclick");
let botonConsulta = document.getElementById("consultarclick");
let botonModificar = document.getElementById("modificarclick");
let botonBaja = document.getElementById("bajaclick");
let natural = document.getElementById("colornatural");
let noNatural = document.getElementsByClassName("colornonatural");
let cNatural = document.getElementById("cNatural");

botonAlta.addEventListener("click", function () { altaPieza(); });
botonConsulta.addEventListener("click", function () { consultaPieza(); });
botonModificar.addEventListener("click", function () { modificarPieza(); });
botonBaja.addEventListener("click", function () { bajaPieza(); });
natural.addEventListener("click", function () { cNatural.remove(); });

function aniadirOption() {
    if (document.getElementById("chapeada").childElementCount == 2) {
        let e = document.createElement("option");
        e.setAttribute("value", "Si");
        e.setAttribute("id", "cNatural");
        e.innerHTML = "Si";
        document.getElementById("chapeada").insertBefore(e, document.getElementById("no"));
        cNatural = document.getElementById("cNatural");
    }
}

for (let i = 0; i < noNatural.length; i++) {
    noNatural[i].addEventListener("click", function () { aniadirOption() });
}