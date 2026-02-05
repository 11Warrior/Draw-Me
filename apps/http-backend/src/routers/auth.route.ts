import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRoute : Router = Router();

authRoute.post('/sign-up', signUp);
authRoute.post('/sing-in', signIn);

export { authRoute };
