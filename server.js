/* jshint node: true */
'use strict';

var express = require('express');
var http = require('http');
var grb = require('grb-server');

var app = express();
var server = http.createServer(app);
server.listen(8080);

app.use(express.static(__dirname + '/public'));

grb.serve(server, grb.IN_MEMORY, 'com.prealpha', 'HelloWorld');
