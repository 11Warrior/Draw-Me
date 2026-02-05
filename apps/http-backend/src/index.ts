import express, { Request, Response } from 'express';
import { authRoute } from './routers/auth.route';
import { JWT_SECRET } from '@repo/backend-common/backend-common'

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/', authRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Home Page of the Server')
})

app.listen(PORT, () => {
    console.log("Server live at", PORT);
    console.log("At http server", JWT_SECRET);
})