import amqp, { Channel } from 'amqplib'

let channelContext: Channel;

export const connectQueue = async () => {
    const connection = await amqp.connect('amqp://localhost');
    channelContext = await connection.createChannel();

    await channelContext.assertQueue('message-write-persist',
        {
            durable: true
        })

    console.log("Rabbit MQ connected.");
}

export const getChannelContext =  (): Channel => {
    if (!channelContext) {
        throw new Error("Rabbit MQ not connected...")
    }
    return channelContext;
}