(function () {
  'use strict';
  var grb = require('grb-client');
  var sp = document.querySelector("#msg");

  grb.ws_blob('/HelloWorld', function (blob) {
    blob.withKeywords("value");
    var object = blob.mirror();

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
