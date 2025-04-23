chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        enabled: true,
        color: '#000000'
    });
});

// Aplicar cor quando a página é carregada
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('routerbox.zazzinternet.com')) {
        chrome.storage.local.get(['color', 'enabled'], (result) => {
            if (result.enabled && result.color) {
                chrome.scripting.executeScript({
                    target: {tabId: tabId},
                    func: (color) => {
                        const header = document.querySelector('.header');
                        if (header) {
                            header.style.backgroundColor = color;
                        }
                    },
                    args: [result.color]
                });
            }
        });
    }
});

// Responder às mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateColor') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0] && tabs[0].url.includes('routerbox.zazzinternet.com')) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    func: (color) => {
                        const header = document.querySelector('.header');
                        if (header) {
                            header.style.backgroundColor = color;
                        }
                    },
                    args: [request.color]
                });

                // Salvar a cor selecionada
                chrome.storage.local.set({color: request.color});
            }
        });
    } else if (request.action === 'getColors') {
        chrome.storage.local.get(['textColor', 'backgroundColor', 'linkColor', 'opacity', 'enabled'], (result) => {
            sendResponse(result);
        });
        return true;
    }
});

