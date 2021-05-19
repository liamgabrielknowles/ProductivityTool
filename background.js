chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.storage.sync.get('grind', (result) => {
        let out = result['grind'];
        if (out === true){
            chrome.tabs.update(sender.tab.id, {url: request.redirect});
        }
    });
});