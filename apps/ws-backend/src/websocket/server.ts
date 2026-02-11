
import { WebSocketServer } from 'ws'
import { verifyUser } from '../utils/ws.util';
import { roomHandler } from './handler';
import { connectQueue } from '../queue/connection';
import { prisma } from '@repo/db/client';

export const WsPrisma = prisma;
const ws_server = new WebSocketServer({ port: 8080 });


ws_server.on('connection', async (ws, request) => {
    const url = request.url as string;

    const { userId, status } = verifyUser(url, ws);

    if (!status) {
        return;
    }

    ws.on('error', (error) => {
        ws.send("We got error connecting to the web socket server : \n" + error)
    })

    ws.on('message', (data) => {
        //message : event sent by the client to join  the room , leave the room, or send-message, need to implement these actions
        const parsedData = JSON.parse(typeof (data) === 'string' ? data : data.toString());
        roomHandler(ws, parsedData, userId);
    })
    // console.log("DB URL:", process.env.DATABASE_URL);

    // await prisma.$connect();

    ws.send("Web Socket server active...");

}).on('listening', async () => {

    await connectQueue();
})

