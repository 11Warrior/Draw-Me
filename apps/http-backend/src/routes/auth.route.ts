import { Router } from "express";
import { isAuthUser, signIn, signUp } from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const authRoute: Router = Router();

authRoute.post('/sign-up', signUp);
authRoute.post('/sign-in', signIn);
authRoute.get('/me', protectRoute, isAuthUser)

export { authRoute };
