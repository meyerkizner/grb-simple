var grb = require('grb-client');
var items = document.querySelector("#items");
var input = document.querySelector("#input");

grb.ws_blob('/todo', function (blob, object) {
    if (!blob.read('list')) {
        blob.create('list', {});
    }

    console.log('loaded');
    input.onkeydown = function(e) {
        if (e.keyCode == 13) {
            blob.create("list." + input.value, input.value);
            input.value = "";
        }
    };

    blob.on('create', function(p, k, v) {
        console.log(v);
        var item = document.createElement('li');
        item.textContent = v;
        items.insertBefore(item, input);
    });
});
