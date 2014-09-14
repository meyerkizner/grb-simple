var grb = require('grb-client');
grb.ws_blob('/', function (blob, object) {
    blob.addKeyword('x');
    blob.addKeyword('y');
    console.log("foo");

    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

    canvas.onmousemove = function(event) {
        object.x = event.pageX - canvas.offsetLeft;
        object.y = event.pageY - canvas.offsetTop;
    };

    blob.on('all', function(){
        ctx.clearRect(0,0, 1000, 1000);
        ctx.fillRect(object.x - 10, object.y - 10, 20, 20);
    });
});
