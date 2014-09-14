var grb = require('grb-client');
var items = document.querySelector("#items");
var input = document.querySelector("#input");

grb.ws_blob('/todo', function (blob, object) {
    if (!blob.read('list')) {
        blob.create('list', {});
    }

    // Build existing items
    for (var k in blob.store.list) {
        makeTodoItem(k);
    }

    // On enter, push new values
    input.onkeydown = function(e) {
    if (e.keyCode == 13) {
        blob.create("list." + input.value, input.value);
        input.value = "";
    }};

    // When an item is added to the global object,
    // drop it into the ui.
    blob.on('create', function(p, k, v) {
        if (k === 'list') return;
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
