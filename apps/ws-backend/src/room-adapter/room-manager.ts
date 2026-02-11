import { WebSocket } from "ws";
import { enqueue } from "../queue/producer";
import { QueuePayloadType } from "../types/ws-backend.types";

class RoomManager {
    //users => new ws connections
    //rooms => set of roomIds associated with the user

    private users = new Map<number, Set<WebSocket>>()
    private rooms = new WeakMap<WebSocket, Set<number>>()

    join(ws: WebSocket, roomId: number) {

        //room => set of [users]
        if (!this.users.has(roomId)) {
            this.users.set(roomId, new Set())
        }

        const users = this.users.get(roomId)

        if (users === undefined) return;

        users.add(ws)

        if (!this.rooms.has(ws)) {
            this.rooms.set(ws, new Set())
        }

        //user -> set of [rooms]
        const rooms = this.rooms.get(ws);

        if (rooms === undefined) return;

        rooms.add(roomId)
    }

    leave(ws: WebSocket, roomId: number) {
        //if room with given id exists and user exists in the given room (roomId)
        if (!this.rooms.has(ws) || !this.users.has(roomId)) {
            return;
        }

        const users = this.users.get(roomId);

        users?.delete(ws);

        this.rooms.get(ws)?.delete(roomId)

    }

    message(userId: string, roomId: number, message: string) {
        const users = this.users.get(roomId);
        // const rooms = this.rooms.get(ws);
        if (!users) return;

        for (const user of users) {
            user.send(JSON.stringify({
                type: "message",
                roomId: roomId,
                message: message
            }))
        }
        // console.log("UserID in roommanager", userId)

        //add message to db via queue pipeline

        enqueue({
            roomId,
            userId,
            message
        } as QueuePayloadType)
    }
}

export const manager = new RoomManager();