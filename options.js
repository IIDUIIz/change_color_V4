document.addEventListener('DOMContentLoaded', function() {
    const domainInput = document.getElementById('domain');
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');
    const statusDiv = document.getElementById('status');
    
    const DEFAULT_DOMAIN = 'routerbox.zazzinternet.com';

    // Carregar configuração salva
    chrome.storage.local.get(['domain'], function(result) {
        domainInput.value = result.domain || DEFAULT_DOMAIN;
    });

    // Função para mostrar mensagem de status
    function showStatus(message, isError = false) {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + (isError ? 'error' : 'success');
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 3000);
    }

    // Salvar configurações
    saveButton.addEventListener('click', function() {
        const domain = domainInput.value.trim();
        
        if (!domain) {
            showStatus('Por favor, insira um domínio válido.', true);
            return;
        }

        chrome.storage.local.set({
            domain: domain
        }, function() {
            showStatus('Configurações salvas com sucesso!');
        });
    });

    // Restaurar configurações padrão
    resetButton.addEventListener('click', function() {
        domainInput.value = DEFAULT_DOMAIN;
        chrome.storage.local.set({
            domain: DEFAULT_DOMAIN
        }, function() {
            showStatus('Configurações restauradas para o padrão!');
        });
    });
}); 