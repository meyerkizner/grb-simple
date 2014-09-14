var grb = require('grb-client');
var items = document.querySelector("#items");
var input = document.querySelector("#input");
input.onkeydown = function(e) {
    if (e.keyCode == 13 && input.onenter) {
        input.onenter();
    }
};

grb.ws_blob('http://localhost:8080/todo', function (blob, object) {
    // If a list doesn't already exist create it.
    // otherwise, populate the ui with the todo items.
    if (!blob.read('list')) {
        blob.create('list', []);
    } else {
        blob.store.list.forEach(function (v){
            makeTodoItem(v);
        });
    }

    var todoList = object.list;

    // On enter, push new values
    input.onenter = function() {
        todoList.push(input.value);
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
