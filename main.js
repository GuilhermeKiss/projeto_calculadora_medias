const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado">';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a média mínima:"));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
    calculaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { //ele valida se o nome da atividade está sendo duplicada
        alert(`ERRO! A atividade: "${inputNomeAtividade.value}" já foi inserida`);
    } else {
    
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value)); //foi usado parseFloat para receber o valor inteiro do input e não a string

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`; //Os sinais de "+=" indica concatenação ou seja poderia ter sido feito "linha = linha + 'outro conteudo' "
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //O sinal de "?" siginfica o IF e o ":" else
    linha += '</tr>';

    linhas += linha;

    inputNomeAtividade.value = ''; //reseta o valor do input toda vez que for enviado o formulário
    inputNotaAtividade.value = '';
}
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}