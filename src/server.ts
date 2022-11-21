import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import flowersRouter from './routes/flowerRoutes';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import dashboardRoutes from './routes/dashboard';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('✿❀ Welcome to the flower shop API ❀✿');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

app.use('/', dashboardRoutes);
app.use('/flowers', flowersRouter);
app.use('/users', userRouter);
app.use('/users/:userID/orders', orderRouter);


export default app;