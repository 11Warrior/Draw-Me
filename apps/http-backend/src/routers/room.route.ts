import { Router } from "express";
import { createRoom } from "../controllers/room.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const roomRoute : Router = Router();

roomRoute.post('/create-room', protectRoute , createRoom);


export { roomRoute };