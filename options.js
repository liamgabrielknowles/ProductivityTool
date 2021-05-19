window.onload = render;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function render() {
    document.getElementById("addBtn").addEventListener("click", AddWebsite);
    document.getElementById("addTodoBtn").addEventListener("click", AddTodo);

    chrome.storage.sync.get('urls', (result) => {
        let out = result['urls'];
        if (typeof(out) != 'undefined'){
            displayWebsites(out);
        }
    });
    chrome.storage.sync.get('todoList', (result) => {
        let out = result['todoList'];
        if (typeof(out) != 'undefined') {
            displayTodo(out);
        }
    });
    await sleep(100);
}

async function RemoveURLHandler(evt){
    let out = evt.currentTarget.out;
    if (typeof(out) != 'undefined'){
        out.splice(evt.currentTarget.index, 1);
        chrome.storage.sync.set({'urls':out});
        await displayWebsites(out);
    }
}
async function AddURLRemoveListener(){
    chrome.storage.sync.get('urls', (result)=> {

        let allListItems = document.querySelectorAll(".webListItem");
        for (let index = allListItems.length -1; index>= 0; index--) {
            allListItems[index].index = index;
            allListItems[index].out = result['urls'];
            allListItems[index].addEventListener("click", RemoveURLHandler, false);
        }
    });
}

async function RemoveTodoHandler(evt) {
    let out = evt.currentTarget.out;
    let keyOut;
    if (typeof (out) != 'undefined') {
        for (const [key, value] of Object.entries(out)){
            if (evt.currentTarget.html ===  parseTodo(key, value)){
                keyOut = key.slice();
                break;
            }
        }
    }
    delete out[keyOut];
    chrome.storage.sync.set({'todoList': out});
    await displayTodo(out);
}
async function AddTodoRemoveListener(){
    chrome.storage.sync.get('todoList', (result)=> {
        let allListItems = document.querySelectorAll(".todoListItem");
        for (let index = 0; index < allListItems.length; index++) {
            allListItems[index].html = allListItems[index].innerHTML;
            allListItems[index].out = result['todoList'];
            allListItems[index].addEventListener("click", RemoveTodoHandler, false);
        }
    });
}

async function AddWebsite(){
    chrome.storage.sync.get('urls', (result) => {
        let out = result['urls'];
        if (typeof(out) != 'undefined'){
            let curWebsite = document.getElementById('myInput').value;
            if (curWebsite === ""){

            } else if (out.includes(curWebsite)) {
                let index = out.indexOf(curWebsite);
                if (index > -1) {
                    out.splice(index, 1);
                }
            }
            else {
                out.push(curWebsite); // adding element to array
            }
            chrome.storage.sync.set({"urls": out});
            document.getElementById('myInput').value = ''; // Making the text box blank
            displayWebsites(out); // displaying the array elements
        }
        else {
            let curWebsite = document.getElementById('myInput').value;
            let newArr = [];
            newArr.push(curWebsite);
            chrome.storage.sync.set({"urls": newArr});
            displayWebsites(newArr);
            document.getElementById('myInput').value = ''; // Making the text box blank

        }
    });
}

async function displayWebsites(arrayOfWeb) {
    let str = '';
    for (let i = 0; i < arrayOfWeb.length; i++) {
        str += '<li class="webListItem">' + arrayOfWeb[i] +  '</li>';  // adding each element with key number to
        // letiable
    }
    document.getElementById('myUL').innerHTML = str; // Display the elements of the array
    await AddURLRemoveListener();
    // set event listeners for recently created buttons
}

async function AddTodo(){
    chrome.storage.sync.get('todoList', (result) => {
        let out = result['todoList'];
        if (typeof(out) != 'undefined'){
            let todoItem = document.getElementById('itemTodo').value;
            let todoTime = document.getElementById('timeTodo').value;

            if (todoTime < .1 || todoItem === "") {
                alert("Please enter valid time (greater that .1 hours) and valid todo item.");
            }
            else {
                out[todoItem] = todoTime;
            }
            chrome.storage.sync.set({"todoList": out});
            document.getElementById('timeTodo').value = ''; // Making the text box blank
            document.getElementById('itemTodo').value = ''; // Making the text box blank
            displayTodo(out); // displaying the dict elements
        }
        else {
            let todoItem = document.getElementById('itemTodo').value;
            let todoTime = document.getElementById('timeTodo').value;
            let newDict = {};
            if (todoTime < .1 || todoItem === "") {
                alert("Please enter valid time (greater that .1 hours) and valid todo item.");
            }
            else {
                newDict[todoItem] = todoTime;
            }
            chrome.storage.sync.set({"todoList": newDict});
            displayTodo(newDict);
            document.getElementById('timeTodo').value = ''; // Making the text box blank
            document.getElementById('itemTodo').value = ''; // Making the text box blank
        }
    });
}

function parseTodo(key, val){
    return key + ' for ' + val + 'hrs';
}

async function displayTodo(dictTodo) {
    let str = '';
    str = '';
    for(let i in dictTodo) {
        str += '<li class="todoListItem">' +  parseTodo(i, dictTodo[i]) +  '</litodoListItem>';
    }

    document.getElementById('myTodoUL').innerHTML = str; // Display the elements of the array
    await AddTodoRemoveListener();
}



