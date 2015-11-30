var WebSocketServer = require('ws').Server;
var exec = require('child_process').exec;
var zmq = require('zmq');
var socket = zmq.socket('pair');

socket.connect('tcp://127.0.0.1:5005');

var receiver = new WebSocketServer({port: 8089});
receiver.on('connection', function connection(ws) {
    console.log('received connection from experimento.html');
    ws.on('message', function incoming(message) {
        console.log("received from experimento:", JSON.parse(message));
        socket.send(message);
    });
});


//child  = exec('chromium biker.html');