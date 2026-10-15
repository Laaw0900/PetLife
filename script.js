document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito de sombra/mudança no Header ao rolar a página
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Rolagem suave para links internos (caso o navegador não suporte nativamente)
    const internalLinks = document.querySelectorAll('nav a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Criação dinâmica do Botão "Voltar ao Topo"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '🐾';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.title = 'Voltar ao topo';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const cards = document.querySelectorAll('.card-servico, .card-pet');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro');

    if (form) {
        form.addEventListener('submit', function(event) {
            // Impede o recarregamento padrão da página
            event.preventDefault();

            // Captura os valores de todos os campos do formulário
            const novoCadastro = {
                id: Date.now(), // ID único baseado no timestamp atual
                tutor: {
                    nome: document.getElementById('nome-tutor').value,
                    email: document.getElementById('email').value,
                    telefone: document.getElementById('telefone').value
                },
                pet: {
                    nome: document.getElementById('nome-pet').value,
                    especie: document.getElementById('especie').value,
                    raca: document.getElementById('raca').value,
                    idade: document.getElementById('idade').value,
                    sexo: document.getElementById('sexo').value,
                    porte: document.getElementById('porte').value,
                    observacoes: document.getElementById('observacoes').value
                },
                dataCadastro: new Date().toLocaleDateString('pt-BR')
            };

            // Recupera os cadastros já salvos no localStorage (ou inicia um array vazio se não houver nenhum)
            let petsCadastrados = JSON.parse(localStorage.getItem('petlife_cadastros')) || [];

            // Adiciona o novo cadastro à lista
            petsCadastrados.push(novoCadastro);

            // Salva a lista atualizada de volta no localStorage
            localStorage.setItem('petlife_cadastros', JSON.stringify(petsCadastrados));

            // Exibe mensagem de sucesso
            alert(`Pet "${novoCadastro.pet.nome}" cadastrado com sucesso! Os dados foram salvos no navegador.`);

            // Limpa o formulário para novos cadastros
            form.reset();
        });
    }
});