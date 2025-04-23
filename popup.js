document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    const enablePicker = document.getElementById('enablePicker');

    // Carregar cor salva
    chrome.storage.local.get(['color', 'enabled'], function(result) {
        if (result.color) {
            colorPicker.value = result.color;
        }
        if (typeof result.enabled !== 'undefined') {
            enablePicker.checked = result.enabled;
        }
    });

    // Atualizar cor quando o usuário selecionar
    colorPicker.addEventListener('input', function() {
        if (enablePicker.checked) {
            updateHeaderColor(this.value);
        }
    });

    // Ativar/desativar mudança de cor
    enablePicker.addEventListener('change', function() {
        chrome.storage.local.set({enabled: this.checked});
        if (this.checked) {
            updateHeaderColor(colorPicker.value);
        }
    });

    // Função para atualizar a cor do header
    function updateHeaderColor(color) {
        chrome.runtime.sendMessage({
            action: 'updateColor',
            color: color
        });
    }
});
