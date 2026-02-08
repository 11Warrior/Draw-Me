import 'express' 
import { JwtPayload } from 'jsonwebtoken'


declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }

    interface jwtPayload extends JwtPayload{
        userId? : string
    }
}