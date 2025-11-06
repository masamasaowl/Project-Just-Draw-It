import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function message(data) {
    ws.send("Hi!");
    console.log("ws server running on port: 8080")
    console.log('received: %s', data);
  });
});