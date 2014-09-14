(function () {
  'use strict';
  var grb = require('grb-client');
  var sp = document.querySelector("#msg");

  grb.ws_blob('/', function (blob) {
    blob.withKeywords("value");
    var object = blob.mirror();

    object.value = "";

    blob.on('all', function() {
        sp.textContent = object.value;
    });

    var textBox = document.getElementById('value');
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        object.value = textBox.value;
    };
  });
})();