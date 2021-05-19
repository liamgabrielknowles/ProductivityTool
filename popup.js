// Start of Real stuff
window.onload = function () {
    generate();

    chrome.storage.sync.get('grind', (result)=>{
        let button = document.getElementById('mainGrind');
        let bod = document.getElementById("main");
        let out = result['grind'];
        if (typeof(out) == 'undefined'){
            chrome.storage.sync.set({'grind': false});
            button.innerHTML = "Grind Mode: <br> Off";
        } else if ( out === true){
            bod.className = "bodyColor";
            button.innerHTML = "Grind Mode: <br> On";
        } else {
            button.innerHTML = "Grind Mode: <br> Off";
        }

    });
    document.getElementById("options").addEventListener("click", () => {
        console.log("options_button clicked");
        chrome.tabs.create({'url': "/options.html"});
    });

    document.getElementById("reset-data").addEventListener("click", () => {
        console.log("Storage reset");
        chrome.storage.sync.clear();
        window.location.href = "popup.html";
        chrome.tabs.reload();
    });

    document.getElementById("mainGrind").addEventListener("click", () => {
        chrome.storage.sync.get('grind', (result) => {
            let out = result['grind'];
            if (typeof(out) == 'undefined'){
                out = false;
            }
            let bod = document.getElementById("main");
            let button = document.getElementById("mainGrind");
            if (out === false) {
                bod.className = "bodyColor";
                button.innerHTML = "Grind Mode: <br> On";
                button.value = "on";
                chrome.storage.sync.set({'grind': true});
            } else if (out === true) {
                bod.className = "none";
                button.innerHTML = "Grind Mode: <br> Off";
                button.value = "off";
                chrome.storage.sync.set({'grind': false});
            }
        });
    });
}


function generate() {
    console.log("onload generating list");
    chrome.storage.sync.get('urls', (result) => {
        let out = result['urls'];
        let linkList = document.getElementById("myUL");
        if (typeof (out) == 'undefined' || out.length === 0) {
            console.log("no links added");
            let newItem = document.createElement('li');
            newItem.appendChild(document.createTextNode("No blocked websites yet!"));
            linkList.appendChild(newItem);
        } else {
            let str = "";
            out.forEach(function (item, index) {
                console.log("adding link " + item);
                str += '<li>' + out[index] + '</li>';
            });
            document.getElementById('myUL').innerHTML = str;
        }
    });

    chrome.storage.sync.get('todoList', (result) => {
        let out = result['todoList'];
        let linkList = document.getElementById("myTodoUL");
        if (typeof (out) == 'undefined' || Object.keys(out).length === 0) {
            console.log("No items added");
            let newItem = document.createElement('li');
            newItem.appendChild(document.createTextNode("Congratulations you have no todo items!"));
            linkList.appendChild(newItem);
        } else {
            let str = '';
            for (const [key, value] of Object.entries(out)) {
                console.log("adding key " + key + " adding item " + value);
                str += '<li>' + 'item:' + key + ' expected time:' + value + '</li>';
            }
            document.getElementById('myTodoUL').innerHTML = str;
        }

    });
}


