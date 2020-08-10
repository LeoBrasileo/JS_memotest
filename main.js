document.querySelectorAll(".carta").forEach(function($carta){
    $carta.onclick = girarCartas;
});

setBacks();

function girarCartas(e) {
    const carta = e.target;
    let parentCarta = carta.parentNode;
    if (parentCarta.className === "cara") {
        parentCarta = parentCarta.parentNode;
        parentCarta.style.transform = "rotateY(180deg)";
    }else {
        parentCarta.style.transform = "rotateY(180deg)";
    }
}

function setBacks () {
    const $carta_atras = document.querySelectorAll(".cara.detras");
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
            for (let i=0; i<6000; i++) { //Cuanto mayor es el numero de la condicion menor es el margen de error pero tambien tarda mas en cargar
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
            for (let i=0; i<6000; i++) {
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
