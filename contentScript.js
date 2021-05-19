function checkWhitelist(){
    chrome.storage.sync.get('urls', (result) => {
        let out = result['urls'];
        let currPage = location.href;
        if (!(typeof(out) == 'undefined')){
            out.forEach((item, index) =>{
                if (currPage.includes(item)){
                    chrome.runtime.sendMessage({redirect:"block.html"});
                }
            })
        }
    });
}

window.onload = function (){
    checkWhitelist();
}
