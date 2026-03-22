
import path from 'path'

import { dependencies } from '@repo/backend-common/backend-common'
import { WebSocket } from 'ws';
import { verifiedUser } from '../types/ws-backend.types';
import { IncomingMessage } from 'http';
import * as cookie from 'cookie'

const { dotenv, jwt } = dependencies

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') } )

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyUser(req: IncomingMessage, ws: WebSocket): verifiedUser {
    const token = cookie.parse(req.headers.cookie || " ").signin_token;

    let decoded;

    try {
        decoded = jwt.verify(token as string, JWT_SECRET);
    } catch (error) {
        console.log("Error while verifying the token", error);
    }

    if (typeof (decoded) === 'string') {
        ws.close();
        return {
            status: false,
            userId: " "
        };
    }

    if (!decoded || !decoded.id) {
        ws.close();
        return {
            status: false,
            userId: " "
        };
    }
    return {
        status: true,
        userId: decoded.id
    };
}