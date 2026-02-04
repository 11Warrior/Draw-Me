import { WebSocketServer } from 'ws'

const ws_server = new WebSocketServer({ port: 8080 });


ws_server.on('connection', (ws) => {
    ws.on('message', (data) => {
        ws.send("pong");
    })

    ws.send("Hello from web socket server");
})
