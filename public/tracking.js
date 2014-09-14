var grb = require('grb-client');
grb.ws_blob('/', function (blob, object) {
    blob.addKeyword('x');
    blob.addKeyword('y');
    console.log("foo");

    var canvas = document.querySelector("canvas");
    var canvasContext = canvas.getContext("2d");

    canvas.onmousemove = function(event) {
        object.x = event.clientX;
        object.y = event.clientY;
    };

    blob.on('all', function(){
        canvasContext.fillRect(object.x - 2.5, object.y - 2.5, 5, 5);
    });
});
