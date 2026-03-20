import { Router } from "express";
import { createRoom, getMessages, getRoomId } from "../controllers/room.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const roomRoute: Router = Router();

roomRoute.post('/create-room', protectRoute, createRoom);
roomRoute.get('/messages', protectRoute, getMessages)
roomRoute.get('', protectRoute, getRoomId)

export { roomRoute };