var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/screen-share-host', function(req, res){
  res.sendFile(__dirname + '/index-screenshare.html');
});

app.use(express.static('public'));

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('video', function(frame){
  	io.emit('client', frame); //send frame to all clients.
  });

});

http.listen(80, function(){
  console.log('listening on *:3000');
});
