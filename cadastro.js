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

            // Redireciona para a página de sucesso pós-cadastro
            window.location.href = 'sucesso.html';
        });
    }
});