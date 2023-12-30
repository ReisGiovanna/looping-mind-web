//-----------------------------------------------------------TRAVANDO O NAVBAR NO TOPO
window.onscroll = function () {
    var navbar = document.getElementById('navbar');
    var scrollPos = window.scrollY;

    if (scrollPos > 0) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
};

//----------------------------------------------------------------LISTANDO AS MATÉRIAS
let contadorItens = 1;

function adicionarItem() {
    contadorItens++;

    const novoItemContainer = document.createElement("div");
    novoItemContainer.classList.add("item-container");

    const novoInput = document.createElement("input");
    novoInput.type = "text";
    novoInput.id = "item" + contadorItens;
    novoInput.name = "item[]";

    const novaEtiqueta = document.createElement("label");
    novaEtiqueta.for = novoInput.id;
    novaEtiqueta.textContent = "Assunto " + contadorItens + ":";

    novoItemContainer.appendChild(novaEtiqueta);
    novoItemContainer.appendChild(novoInput);

    document.getElementById("items-container").appendChild(novoItemContainer);
}

function removerUltimoItem() {
    const itemsContainer = document.getElementById("items-container");
    const itens = itemsContainer.getElementsByClassName("item-container");

    if (itens.length > 1) {
        itemsContainer.removeChild(itens[itens.length - 1]);
        contadorItens--;
    }
}

//--------------------------------------------------------RESPOSTA DA SEGUNDA PERGUNTA
function mostrarProximaPergunta() {
    const itensDigitados = [];
    for (let i = 1; i <= contadorItens; i++) {
        const inputItem = document.getElementById("item" + i);
        if (inputItem) {
            itensDigitados.push(inputItem.value);
        }
    }

    const avaliacaoContainer = document.getElementById("avaliacao-container");

    for (let i = 0; i < itensDigitados.length; i++) {
        const labelItemDigitado = document.createElement("label");
        labelItemDigitado.textContent = (i + 1) + "°: " + itensDigitados[i];
        avaliacaoContainer.appendChild(labelItemDigitado);

        const selectNota = document.createElement("select");
        selectNota.name = "avaliacao[]";
        selectNota.classList.add("selectResposta");
        for (let j = 1; j <= 5; j++) {
            const option = document.createElement("option");
            option.value = j;
            option.text = j;
            selectNota.appendChild(option);
        }

        avaliacaoContainer.appendChild(selectNota);

        avaliacaoContainer.appendChild(document.createElement("br"));
    }
}

//--------------------------------------------------------FAZENDO OS RESULTADOS
let somaAvaliacoes = 0;
let valorHoras = 0;
let valorDias = 0;
let divisaoHoras = 0;

function obterValoresSelects() {
    const selects = document.getElementsByClassName("selectResposta");
    somaAvaliacoes = 0;

    for (let i = 0; i < selects.length; i++) {
        const valorSelecionado = parseInt(selects[i].value);
        somaAvaliacoes += valorSelecionado;
    }
}

function capturarHoras() {
    var inputElement = document.getElementById("horasDedicadas");
    valorHoras = parseInt(inputElement.value);

    if (isNaN(valorHoras) || valorHoras <= 0 || valorHoras > 23) {
        alert("Por favor, insira um valor válido para horas dedicadas (1 a 23 horas).");
        return;
    }
}

function capturarDias() {
    var inputElement = document.getElementById("diasDedicados");
    valorDias = parseInt(inputElement.value);

    if (isNaN(valorDias) || valorDias <= 0 || valorDias > 7) {
        alert("Por favor, insira um valor válido para dias dedicados (1 a 7 dias).");
        return;
    }
}

function exibirResultado() {
    const itensDigitados = document.querySelectorAll('#items-container input');
    if (itensDigitados.length === 0 || itensDigitados[0].value.trim() === "") {
        alert("Por favor, adicione pelo menos um assunto.");
        return;
    }
    const resultados = [];
    var cargaSemanal = valorDias * valorHoras;
    divisaoHoras = cargaSemanal / somaAvaliacoes;

    for (let i = 0; i < itensDigitados.length; i++) {
        const nomeItem = itensDigitados[i].value;
        const selectValor = parseInt(document.querySelectorAll('.selectResposta')[i].value);

        const resultadoItem = Math.round(selectValor * divisaoHoras);
        resultados.push({ nome: nomeItem, resultado: resultadoItem });
    }

    const resultadosDiv = document.getElementById("resultadosDiv");
    resultadosDiv.innerHTML = "";

    if (resultados.length > 0) {
        for (let i = 0; i < resultados.length; i++) {
            const labelItem = document.createElement("label");
            labelItem.textContent = `${resultados[i].nome}: ${resultados[i].resultado}h`;
            resultadosDiv.appendChild(labelItem);
            resultadosDiv.appendChild(document.createElement("br"));
        }

        const labelHoraPorDia = document.createElement("label");
        labelHoraPorDia.textContent = `Horas por dia: ${valorDias}`;
        resultadosDiv.appendChild(labelHoraPorDia);
        resultadosDiv.appendChild(document.createElement("br"));

        const labelCarga = document.createElement("label");
        labelCarga.textContent = `Carga semanal: ${cargaSemanal}h`;
        resultadosDiv.appendChild(labelCarga);
        resultadosDiv.appendChild(document.createElement("br"));

    } else {
        const labelSemResultados = document.createElement("label");
        labelSemResultados.textContent = "Nenhum item encontrado para exibir resultados.";
        resultadosDiv.appendChild(labelSemResultados);
    }
}
