/*Nao esqueca de alterar o nome da superficie na linha 33!*/

var WebSocketServer = require('ws').Server;
var zmq = require('zmq');
var pupilClient = zmq.socket('sub');
var exec = require('child_process').exec;

var smoothX = 0.5;
var smoothY = 0.5;
var dimX = 1366;
var dimY = 768;


var receiver = new WebSocketServer({port: 8089});
receiver.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        var msg = JSON.parse(message);
        console.log("received:", msg);
        dimX = msg.w;
        dimY = msg.h;
    });

    //recebe mensagem do Pupil
    pupilClient.on('message', function(data) {
        var msg = data.toString();
        //console.log(msg);
        var items = msg.split('\n');
        var msgType = items.shift();
        var dict = []
        for (i in items) {
            var k = items[i].split(':');
            dict[k[0]] = k[1];
        }
        if (msgType == 'Gaze') {
            try {
                var gazeOnScreen = dict['realtime gaze on experimento']; //<-- altere isso para o nome da sua tela
                var points = gazeOnScreen.split(',');
                var rawX = parseFloat(points[0].slice(1));
                var rawY = parseFloat(points[1]);
                smoothX += 0.5 * (rawX - smoothX);
                smoothY += 0.5 * (rawY - smoothY);
                var x = smoothX;
                var y = smoothY;
                y = 0.98 - y;
                x *= dimX;
                y *= dimY;

                //envia mensagem pro cliente websocket
                ws.send(JSON.stringify({x: x, y: y}));
            }
            catch(Exception) {
                console.log('PUPIL: superfície não encontrada.');
            }
        }
    });
});
pupilClient.connect('tcp://localhost:5000');
pupilClient.subscribe('');