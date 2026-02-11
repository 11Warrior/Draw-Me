import { prisma } from '@repo/db/client';
import amqp from 'amqplib'
import { getChannelContext } from '../queue/connection';
import { DBMessageType } from '../types/ws-backend.types';
import { WsPrisma } from '../websocket/server';

//db write operation will happen here
const Worker = async () => {

    const connection = await amqp.connect('amqp://localhost');
    const channelContext = await connection.createChannel();

    channelContext.assertQueue('message-write-persist', {
        durable: true
    })

    // const channelContext = getChannelContext();
    console.log('Worker listening...');

    channelContext.prefetch(5);

    channelContext.consume('message-write-persist', async (data) => {
        if (!data || !data.content) {
            return;
        }

        try {
            const message = JSON.parse(data.content.toString()!) as DBMessageType
            // console.log("Data:", message);

            if (!message.userId || !message.roomId || !message.message) {
                console.log("Missing data");
                channelContext.ack(data);
                return;
            }

            await WsPrisma.message.create({
                data: message
            })

            console.log('Message added to the db');

            // channelContext.ack(data, false)
        } catch (error) {
            console.log("DB Error", error);
            // channelContext.nack(data);
        }
    })
}

Worker();