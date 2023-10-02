const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Triste" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima'));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault(); //impede o recarregamento da página
    addLinha();
    atualizaTabela();
    atualizaMedia();
});

function addLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    }
    else {
        atividades.push(inputNomeAtividade.value); //.push adiciona conteudo ao array
        notas.push(parseFloat(inputNotaAtividade.value)); //parseFloat() transforma valor de string em valor numerico

        let linha = '<tr>'; 
        linha += `<td>${inputNomeAtividade.value}</td>`;    //"linha +=" é o mesmo que escrever "linha = linha + 'outro conteudo'"
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;    //"?" representa o if ":" representa o else
        linha += `</tr>`;

        linhas += linha;
    }

    inputNomeAtividade.value = '';  //limpando os campos
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');    //selecionando corpo da tabela
    corpoTabela.innerHTML = linhas;  //.innerHTML para inserir conteudo dentro de uma tag
}

function atualizaMedia() {
    const mediaFinal = calculaMedia();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMedia() {
    let somaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i];
    }

    return somaNotas / notas.length;
}