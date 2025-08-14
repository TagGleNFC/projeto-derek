// js/drumkit-page.js

document.addEventListener("DOMContentLoaded", () => {
    // Tenta carregar os dados do drum kit
    if (typeof allDrumKits === 'undefined') {
        console.error("Os dados dos drum kits (data-drumkits.js) não foram carregados.");
        document.body.innerHTML = "<h1 style='color: white; text-align: center; margin-top: 50px;'>Erro ao carregar dados.</h1>";
        return;
    }
    
    // Pega o ID do kit da URL
    const urlParams = new URLSearchParams(window.location.search);
    const kitId = parseInt(urlParams.get('id'));

    // Encontra o kit correspondente no array
    const kit = allDrumKits.find(k => k.id === kitId);

    // Se o kit não for encontrado, exibe uma mensagem de erro
    if (!kit) {
        document.title = "Kit não Encontrado - Dj Smoke";
        const contentWrapper = document.getElementById("drumkit-content-wrapper");
        if(contentWrapper) {
            contentWrapper.innerHTML = `
                <div class="container" style="text-align: center; padding-top: 15vh; color: white;">
                    <h1>Drum Kit Não Encontrado</h1>
                    <p>O kit que você está procurando não existe ou foi removido.</p>
                    <a href="drumkits.html" class="btn btn-primary">Voltar ao Catálogo</a>
                </div>`;
        }
        return;
    }

    // --- PREENCHE A PÁGINA COM OS DADOS DO KIT ---

    // Atualiza o título da página
    document.title = `${kit.title} - Dj Smoke`;

    // Seção Hero
    document.querySelector('.drumkit-title').textContent = kit.title;
    document.querySelector('.drumkit-genre-tag').textContent = kit.genre;
    document.querySelector('.drumkit-description-text').textContent = kit.description;
    document.querySelector('.drumkit-image').src = kit.image;
    document.querySelector('.drumkit-image').alt = kit.title;

    // Seção de Compra
    document.querySelector('.purchase-title').textContent = kit.title;
    document.querySelector('.purchase-description').textContent = kit.description;
    document.querySelector('.drumkit-image-purchase').src = kit.image;
    document.querySelector('.drumkit-image-purchase').alt = kit.title;
    document.querySelector('.price-value').textContent = `R$ ${kit.price.toFixed(2).replace('.', ',')}`;

    // --- FUNCIONALIDADES ---
    
    function handlePurchase() {
        if (kit.purchaseLink) {
            window.open(kit.purchaseLink, "_blank");
        } else {
            alert("Link de compra indisponível. Por favor, entre em contato.");
            console.error("Link de compra não definido para o kit ID:", kit.id);
        }
    }

    // Adiciona evento de clique para todos os botões de compra
    const purchaseButtons = document.querySelectorAll('.btn-purchase');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', handlePurchase);
    });

    // Lógica da Navbar retrátil (opcional, mas bom ter)
    const nav = document.getElementById('retractable-nav');
    if (nav) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Mostra a navbar após rolar 200px
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
            lastScrollY = window.scrollY;
        });
    }
});