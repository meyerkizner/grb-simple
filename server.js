/* jshint node: true */
'use strict';

var express = require('express');
var http = require('http');
var grb = require('grb-server');

var app = express();
var server = http.createServer(app);
server.listen(8080);

app.use(express.static(__dirname + '/public'));

var memory = new grb.facets.MemoryFacet();
var broadcast = new grb.facets.BroadcastFacet();
grb.serve(server, '/', 'com.prealpha', 'HelloWorld', [memory, broadcast]);
