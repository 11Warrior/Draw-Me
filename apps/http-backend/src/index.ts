import { dependencies } from '@repo/backend-common/backend-common'
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

app.use('/auth', authRoute);
app.use('/room', roomRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Home Page of the Server')
})

app.listen(PORT, async () => {
    console.log("Server live at", PORT);
    await prisma.$connect();
})