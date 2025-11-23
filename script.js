// Aguarda o HTML carregar antes de executar o script para evitar erros
document.addEventListener("DOMContentLoaded", () => {

let cardContainer = document.querySelector(".card-containe");
let dados = [];
let searchInput = document.getElementById("caixa-busca");

async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Mostra todos os cards na primeira vez
    } catch (error) {
        console.error("Falha ao carregar os dados:", error);
    }
}

function filtrarERenderizar() {
    const termoBusca = searchInput.value.toLowerCase();

    // Filtra o array de dados original
    const dadosFiltrados = dados.filter(dado => {
        // Retorna true se o nome do jogo (em minúsculas) incluir o termo da busca
        return dado.nome.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(cardsParaRenderizar) {
    // 1. Limpa o container para não acumular resultados
    cardContainer.innerHTML = "";

    // 2. Cria e adiciona os cards filtrados
    for (let dado of cardsParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("Cards");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <p>Pataformas: ${dado.plat}</p>
         `;
        cardContainer.appendChild(article);
    }
}

// Adiciona um "ouvinte" que filtra os cards a cada tecla digitada
searchInput.addEventListener("keyup", filtrarERenderizar);

// Chama a função para carregar os dados iniciais assim que a página abre
iniciarBusca();

});