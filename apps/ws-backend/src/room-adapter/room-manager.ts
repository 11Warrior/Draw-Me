import { WebSocket } from "ws";

class RoomManager {
    private users = new Map<number, Set<WebSocket>>()
    private rooms = new WeakMap<WebSocket, Set<number>>()

    join(ws: WebSocket, roomId: number) {
        //room => set of [users]
        if (!this.users.has(roomId)) {
            this.users.set(roomId, new Set())
        }

        const users = this.users.get(roomId)

        if (users === undefined) return;

        this.users.set(roomId, users.add(ws));


        if (!this.rooms.has(ws)) {
            this.rooms.set(ws, new Set())
        }

        //user -> set of [rooms]
        const rooms = this.rooms.get(ws);

        if (rooms === undefined) return;

        this.rooms.set(ws, rooms.add(roomId))

        //queueing the db upate 


    }

    leave(ws: WebSocket, roomId: number) {
        //if room with given id exists and user exists in the given room (roomId)
        if (!this.rooms.has(ws) || !this.users.has(roomId)) {
            return;
        }

        const users = this.users.get(roomId);

        users?.delete(ws);



        //database remove user action to be piped in the queue and done somewhere else
    }

    message(ws: WebSocket, roomId: number, message: string) {

    }
}

export const manager = new RoomManager();