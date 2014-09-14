var grb = require('grb-client');
var items = document.querySelector("#items");
var input = document.querySelector("#input");
var title = document.querySelector("h1");
input.onkeydown = function(e) {
    if (e.keyCode == 13 && input.onenter) {
        input.onenter();
    }
};


grb.ws_blob('http://localhost:8080/todo', function (blob, object) {
    title.onclick = function(){
      blob.update("list", []);
      while (items.children.length > 1) {
        items.removeChild(items.firstChild);
      }
    };
    blob.addKeyword('list');
    // If a list doesn't already exist create it.
    // otherwise, populate the ui with the todo items.
    if (!blob.read('list')) {
        blob.create('list', []);
    } else {
      console.log("loading", blob.store.list);
        blob.store.list.forEach(function (v){
            makeTodoItem(v);
        });
    }

    // On enter, push new values
    input.onenter = function() {
        object.list.push(input.value);
        input.value = "";
    };

    // When an item is added to the global object,
    // drop it into the ui.
    blob.on('arrPush', function(p, k, v) {
        makeTodoItem(v);
    });
});

function makeTodoItem(contents) {
    var item = document.createElement('li');
    item.style.maxHeight = '0px';
    setTimeout(function(){item.style.maxHeight="50px";}, 50);
    item.textContent = contents;
    items.insertBefore(item, input);
}


