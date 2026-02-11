import { QueuePayloadType } from '../types/ws-backend.types';
import { getChannelContext } from './connection'

export const enqueue = (payload: QueuePayloadType) => {
    const channel = getChannelContext();

    channel.sendToQueue('message-write-persist',
        Buffer.from(JSON.stringify(payload)), {
        persistent: true
    })

}