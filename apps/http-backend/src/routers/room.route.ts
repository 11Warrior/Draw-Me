import { Router } from "express";
import { createRoom, getMessages } from "../controllers/room.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const roomRoute: Router = Router();

roomRoute.post('/create-room', protectRoute, createRoom);
roomRoute.get('/messages', getMessages)


export { roomRoute };