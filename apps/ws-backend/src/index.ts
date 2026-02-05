import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/backend-common'

const ws_server = new WebSocketServer({ port: 8080 });

ws_server.on('connection', (ws, request) => {
    const url = request.url;
    const token = url?.split('?')[1];
    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log("Error while verifying the token", error);
    }

    if (!decoded || !decoded.userId) {
        ws.close();
        return;
    }

    ws.on('message', (data) => {
        ws.send("pong");
    })


    ws.send("Hello from web socket server");
})
