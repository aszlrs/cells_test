
var btn_cant_clientes = document.getElementById("OK");
var cant_clientes = document.getElementById("cant_clientes");
var informacion = document.getElementById("informacion");

var clientes = new Map();
var cant_clientes_value = 0;
//escuchamos cantgidad de clientes
btn_cant_clientes.addEventListener("click", function() {
    if (cant_clientes.value > 0) {
        cant_clientes_value = parseInt(cant_clientes.value);        
        askOperationsPerClient();
    } 
});

//solicitamos la cantidad de operaciones por cliente
function askOperationsPerClient() {
    for (let i = 0; i < cant_clientes_value; i++) {
        let operaciones = prompt("Ingrese la cantidad de operaciones para el cliente " + i + ":");
        if (operaciones > 0 && operaciones <= 10) {
            clientes.set(i, {opsRestantes: parseInt(operaciones), opsRealizadas: 0});
            informacion.innerHTML += "<br>Cliente " + i + ": " + operaciones + " operaciones.";
        } else {
            informacion.innerHTML += "<br>Cliente " + i + ": cantidad de operaciones no válida.";
            clientes.set(i, {opsRestantes: 0, opsRealizadas: 0});
        }
    }
}


var btn_simular = document.getElementById("simular"); 
btn_simular.addEventListener("click", function() {
    if (cant_clientes_value > 0 && clientes.size > 0) {
        let posicion = parseInt(prompt("Ingrese la posición de Alex en la fila:")); 
        let operaciones = parseInt(prompt("Ingrese las operaciones:")); 
        if (posicion < cant_clientes_value && clientes.has(posicion)) {            
            simular(operaciones, posicion);
        }
        else{
            alert("La posición ingresada no es válida.");
        }
    }
})


function simular(operaciones, posicion) {
    let cola = [];
    //llenamos cola con Map de clientes
    for (let [key, value] of clientes.entries()) {
        cola.push({ id: key, opsRestantes: value.opsRestantes, opsRealizadas: 0 });
    }

    let tiempo = 0;
    let tiempoAlex = 0;
    let info_sim = document.getElementById("info_sim");
    let info_cola = document.getElementById("info_cola");
    info_sim.textContent = "Simulando...";

    //simulamos
    while (cola.length > 0) {
        let cliente = cola.shift();
        tiempo++;

        //consideraciones si Alex
        if (cliente.id === posicion) {
            tiempoAlex = tiempo;
            info_cola.innerHTML += `<br>(t=${tiempo}) Alex en ventanilla con ${cliente.opsRealizadas} operaciones realizadas.`;
        } else {
            if (cola.some(el => el.id === posicion)) {
                let alex = cola.find(el => el.id === posicion);
                info_cola.innerHTML += `<br>(t=${tiempo}) Alex en fila con ${alex.opsRealizadas} operaciones realizadas.`;
            }
        }

        cliente.opsRestantes--;
        cliente.opsRealizadas++;

        if (cliente.opsRestantes > 0) {cola.push(cliente); }
    }

    return tiempoAlex;
}

