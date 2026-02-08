import path from 'path'
import { dependencies } from '@repo/backend-common/backend-common'

const { dotenv, jwt } = dependencies

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

const JWT_SECRET = process.env.JWT_SECRET!;

import { WebSocketServer } from 'ws'
const ws_server = new WebSocketServer({ port: 8080 });

ws_server.on('connection', (ws, request) => {
    const url = request.url;
    const token = url?.split('?')[1] as string;
    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log("Error while verifying the token", error);
    }

    if (typeof (decoded) === 'string') {
        ws.close();
        return;
    }

    if (!decoded || !decoded.userId) {
        ws.close();
        return;
    }

    ws.on('message', (data) => {
        ws.send("pong" + data,);
    })


    ws.send("Hello from web socket server");
})
