// VARIÁVEIS GLOBAIS (Guardam o estado atual do catálogo)
let categoriaAtual = 'todos';
let paginaAtual = '1';

// Função chamada quando o usuário clica em uma CATEGORIA (Ação, RPG...)
function filtrarCategoria(categoriaSelecionada) {
    categoriaAtual = categoriaSelecionada;
    paginaAtual = '1'; // Sempre que muda de categoria, volta para a página 1

    // Atualiza o visual roxo dos botões de categoria
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    botoesFiltro.forEach(btn => btn.classList.remove('active'));
    
    // Trata o clique direto ou o clique via evento do menu
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Reseta o destaque visual para o número 1 na paginação
    atualizarVisualPaginacao();

    // Aplica os filtros na tela
    aplicarFiltros();
}

// Função chamada quando o usuário clica em um NÚMERO DE PÁGINA (1, 2, 3...)
function mudarPagina(numeroPagina) {
    if (event) event.preventDefault(); // Evita que a página suba sozinha
    paginaAtual = numeroPagina;

    // Atualiza o visual dos números da paginação
    const botoesPagina = document.querySelectorAll('.btn-pagina');
    botoesPagina.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Recarrega os jogos da página escolhida
    aplicarFiltros();
}

// LÓGICA PRINCIPAL: Une Categoria + Página
function aplicarFiltros() {
    const jogos = document.querySelectorAll('.card-game');

    jogos.forEach(jogo => {
        const categoriaDoJogo = jogo.getAttribute('data-categoria');
        const paginaDoJogo = jogo.getAttribute('data-pagina');

        // O jogo só aparece se bater a categoria E a página ao mesmo tempo
        const bateCategoria = (categoriaAtual === 'todos' || categoriaDoJogo === categoriaAtual);
        const batePagina = (paginaDoJogo === paginaAtual);

        if (bateCategoria && batePagina) {
            jogo.style.display = "block";
        } else {
            jogo.style.display = "none";
        }
    });
}

function atualizarVisualPaginacao() {
    const botoesPagina = document.querySelectorAll('.btn-pagina');
    botoesPagina.forEach((btn, index) => {
        if (index === 0) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}