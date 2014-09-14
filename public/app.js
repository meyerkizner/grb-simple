(function () {
  'use strict';

  var grb = require('grb-client');
  grb.ws_blob('/', function (blob) {
    blob.create('value', '', true);
    var textBox = document.getElementById('value');
    var submit = document.getElementById('submit');
    submit.onclick = function () {
      blob.update("value", textBox.value); 
      //blob.mirror().value = textBox.value;
    };
  });
})();
