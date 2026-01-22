const display = document.getElementById("display");

function adicionarNumero(valor) {
    if (display.value === "Erro") display.value = "";
    display.value += valor;
}

function limparTela() {
    display.value = "";
}

function calcularResultado() {
    try {
        const resultado = Function("return " + display.value.replace(/[^0-9+\-*/().]/g, ''))();
        display.value = resultado;
    } catch (e) {
        display.value = "Erro";
    }
}