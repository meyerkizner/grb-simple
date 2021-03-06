/* jshint node: true */
'use strict';

var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var grb = require('grb-server');

var app = express();
var server = http.createServer(app);
server.listen(8080);

app.use(express.static(__dirname + '/public'));

var io = socketio.listen(server);

(function () {
  var mongo = new grb.facets.MongoFacet('mongodb://localhost:27017/grb');
  var memory = new grb.facets.MemoryFacet();
  var broadcast = new grb.facets.BroadcastFacet();
  grb.serve(io, '/HelloWorld', 'com.prealpha.grb', 'HelloWorld', [mongo, memory, broadcast]);
})();

(function () {
  var mongo = new grb.facets.MongoFacet('mongodb://localhost:27017/grb');
  var memory = new grb.facets.MemoryFacet();
  var broadcast = new grb.facets.BroadcastFacet();
  grb.serve(io, '/todo', 'com.prealpha.grb', 'TodoMVC', [mongo, memory, broadcast]);
})();

(function () {
  var mongo = new grb.facets.MongoFacet('mongodb://localhost:27017/grb');
  var memory = new grb.facets.MemoryFacet();
  var broadcast = new grb.facets.BroadcastFacet();
  grb.serve(io, '/track', 'com.prealpha.grb', 'Tracking', [mongo, memory, broadcast]);
})();
