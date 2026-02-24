import { dependencies } from '@repo/backend-common/backend-common'
// import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
const { dotenv } = dependencies;

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

import express, { Request, Response } from 'express';
import { authRoute } from './routers/auth.route';
import { prisma } from '@repo/db/client';
import { roomRoute } from './routers/room.route';

const app = express();

const PORT = 3000;

app.use(express.json());
// app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

app.use('/auth', authRoute);
app.use('/room', roomRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Home Page of the Server')
})

app.listen(PORT, async () => {
    await prisma.$connect();
    console.log("Server live at", PORT);
})