let contadorClicks = 0;
let num1 = 0;
let cartaCoinc = "";
let puntos = 0;
let ganadas = [];
let visualizacion = 1000;
let reset_mode = false;
let empezar = 0;
let boton = document.querySelector("button");

setBacks();
boton.onclick = permitirInput;

function permitirInput (){
    document.querySelectorAll(".carta").forEach(function($carta){
        $carta.onclick = girarCartas;
    });
    boton.innerText = "Comenzar de nuevo";
    boton.onclick = restartGame;
}

function bloquearInput () {
    document.querySelectorAll(".carta").forEach(function($carta){
        $carta.onclick = "";
    });
}

function restartGame () {
    puntos = 0;
    ganadas = [];
    contadorClicks = 0;
    visualizacion = 0;
    resetear();
    reset_mode = true;
    document.querySelector("#estado").childNodes[1].innerText = "Apreta una carta para darla vuelta";
    document.querySelector("#points").innerText = puntos;
    setBacks();
    visualizacion = 1000;
}

function girarCartas(e) {
    const carta = e.target;
    let parentCarta = carta.parentNode;
    if (parentCarta.className === "cara") {
        parentCarta = parentCarta.parentNode;
        parentCarta.style.transform = "rotateY(180deg)";
        contadorClicks++;
        if (contadorClicks %2 !== 0) {
            const $carta_atras = parentCarta.childNodes[3].childNodes[1];
            let stringImg = $carta_atras.getAttribute("src");
            stringImg = stringImg.replace("img/","");
            num1 = Number(stringImg.replace(".jpg",""));
            cartaCoinc = carta;
        }
        if (contadorClicks %2 === 0) {
            const $carta_atras = parentCarta.childNodes[3].childNodes[1];
            let stringImg = $carta_atras.getAttribute("src");
            stringImg = stringImg.replace("img/","");
            let num2 = Number(stringImg.replace(".jpg",""));
            if (num1 === num2) {
                document.querySelector("#estado").childNodes[1].innerText = "Encontraste una coincidencia";
                puntos++;
                if (puntos === 6) {
                    document.querySelector("#estado").childNodes[1].innerText = "¡Ganaste en " + contadorClicks/2 + " turnos!";
                }
                ganadas.push(carta.parentNode.parentNode);
                ganadas.push(cartaCoinc.parentNode.parentNode);
            } else {
                bloquearInput();
                resetear();
            }
        }
    }
    document.querySelector("#points").innerText = puntos;
    return contadorClicks;
}

function resetear() {
    let cartas = document.querySelectorAll(".carta");
    let estilo = "";
    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i] === ganadas[0]
            || cartas[i] === ganadas[1]
            || cartas[i] === ganadas[2]
            || cartas[i] === ganadas[3]
            || cartas[i] === ganadas[4]
            || cartas[i] === ganadas[5]
            || cartas[i] === ganadas[6]
            || cartas[i] === ganadas[7]
            || cartas[i] === ganadas[8]
            || cartas[i] === ganadas[9]
            || cartas[i] === ganadas[10]
            || cartas[i] === ganadas[11]) {
            }else {
                estilo = cartas[i].style.transform;
                document.querySelector("#estado").childNodes[1].innerText = "Mala suerte, volve a intentarlo";
            if (estilo === "rotateY(180deg)") {
                setTimeout(function() {
                    cartas[i].setAttribute("style","tranform: rotateY(360deg)")
                    document.querySelector("#estado").childNodes[1].innerText = "Apreta una carta para darla vuelta";
                    permitirInput();
                },visualizacion);
            }
        }
    }
}

function setBacks () {
    const $carta_atras = document.querySelectorAll(".cara.detras");
    let frecTesteo = 6000; //Cuanto mayor es este numero menor es el margen de error pero tambien tarda mas en cargar
    let usados = [];
    //primera vuelta
    for (let i = 0; i<$carta_atras.length; i = i + 2) {
        let stringImg = $carta_atras[i].parentNode.getAttribute("id");
        let numImg = Number(stringImg.replace("carta",""));
        let numRN = Math.floor(Math.random() * 6) + 1;
        let childBack = document.querySelector("#carta" + numImg).childNodes[3].childNodes[1];
        if (numRN === usados[0]
            || numRN === usados[1]
            || numRN === usados[2]
            || numRN === usados[3]
            || numRN === usados[4]
            || numRN === usados[5]) {
            //debo generar un nuevo numero random ente 1 y 6 que no haya salido antes
            let usadofor = 0;
            for (let i=0; i<frecTesteo; i++) {
                if (numRN === usados[i] 
                    || usadofor === usados[0]
                    || usadofor === usados[1]
                    || usadofor === usados[2]
                    || usadofor === usados[3]
                    || usadofor === usados[4]
                    || usadofor === usados[5]) {
                    if (Math.floor(Math.random() * -2) + 1 === 0) {
                        if (numRN === 1) {
                            numRN = Math.floor(Math.random() * (5 - numRN + 1)) + numRN + 1;
                            usadofor = numRN;
                        }else {
                            numRN = Math.floor(Math.random() * (numRN -1 - 1)) + 1;
                            usadofor = numRN;
                        }
                    } else {
                        if (numRN === 6) {
                            numRN = Math.floor(Math.random() * (numRN -1 - 1)) + 1;
                            usadofor = numRN
                        } else {
                            numRN = Math.floor(Math.random() * (5 - numRN + 1)) + numRN + 1;
                            usadofor = numRN;
                        }
                    }
                }
            }
        }
        childBack.src = "img/" + numRN + ".jpg";
        usados.push(numRN);
    }
    //segunda vuelta
    usados = [];
    for (let i=1; i<$carta_atras.length; i = i + 2) {
        let stringImg = $carta_atras[i].parentNode.getAttribute("id");
        let numImg = Number(stringImg.replace("carta",""));
        let numRN = Math.floor(Math.random() * 5) + 1;
        let childBack = document.querySelector("#carta" + numImg).childNodes[3].childNodes[1];
        if (numRN === usados[0]
            || numRN === usados[1]
            || numRN === usados[2]
            || numRN === usados[3]
            || numRN === usados[4]
            || numRN === usados[5]) {
            let usadofor = 0;
            for (let i=0; i<frecTesteo; i++) {
                if (numRN === usados[i] 
                    || usadofor === usados[0]
                    || usadofor === usados[1]
                    || usadofor === usados[2]
                    || usadofor === usados[3]
                    || usadofor === usados[4]
                    || usadofor === usados[5]) {
                    if (Math.floor(Math.random() * -2) + 1 === 0) {
                        if (numRN === 1) {
                            numRN = Math.floor(Math.random() * (5 - numRN + 1)) + numRN + 1;
                            usadofor = numRN;
                        }else {
                            numRN = Math.floor(Math.random() * (numRN -1 - 1)) + 1;
                            usadofor = numRN;
                        }
                    } else {
                        if (numRN === 6) {
                            numRN = Math.floor(Math.random() * (numRN -1 - 1)) + 1;
                            usadofor = numRN
                        } else {
                            numRN = Math.floor(Math.random() * (5 - numRN + 1)) + numRN + 1;
                            usadofor = numRN;
                        }
                    }
                }
            }
        }
        childBack.src = "img/" + numRN + ".jpg";
        usados.push(numRN);
    }
}
