
export type QueuePayloadType = {
    userId: string,
    roomId: number,
    message: string
}

export interface verifiedUser {
    status: boolean,
    userId: string
}


export interface WSDataType {
    type: string,
    roomId: number,
    userId?: string,
    message?: string
}


export interface DBMessageType {
    roomId: number,
    userId: string,
    message: string
}

