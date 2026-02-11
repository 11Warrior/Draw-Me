import { WebSocket } from "ws";
import { manager } from "../room-adapter/room-manager";
import { WSDataType } from "../types/ws-backend.types";


//layer to cover all possible actions related to room   
export function roomHandler(ws: WebSocket, data: WSDataType, userId: string) {
    if (data.type === 'join_room') {
        manager.join(ws, data.roomId);
    }

    if (data.type === 'leave_room') {
        manager.leave(ws, data.roomId);
    }

    if (data.type === 'send_message') {
        manager.message(userId, data.roomId, data.message!);
    }
}