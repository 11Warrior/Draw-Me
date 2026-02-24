import amqp, { Channel } from 'amqplib'

let channelContext: Channel;

export const connectQueue = async () => {
    const connection = await amqp.connect('amqp://localhost');
    channelContext = await connection.createChannel();

    channelContext.assertQueue('message-write-persist', {
        durable: true,
        messageTtl : 4 * 1000 * 60 * 60 * 24,
    })

    console.log("Rabbit MQ connected.");
}

export const getChannelContext =  (): Channel => {
    if (!channelContext) {
        throw new Error("Rabbit MQ not connected...")
    }
    return channelContext;
}