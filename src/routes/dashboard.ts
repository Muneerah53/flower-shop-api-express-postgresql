import express, { Request, Response, Router } from 'express';
import verifyAuthToken from '../middleware/verifyToken';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes: Router = Router();

const dashboard = new DashboardQueries();

const orderCart = async (_req: Request, res: Response) => {
    const orderID = _req.params.orderID;
    const products = await dashboard.orderCart(orderID);
    res.json(products);
};


const fiveMostPopular = async (_req: Request, res: Response) => {
    const products = await dashboard.fiveMostPopular();
    res.json(products);
};

dashboardRoutes.use('/cart/:orderID', verifyAuthToken, orderCart);
dashboardRoutes.use('/five-most-popular', fiveMostPopular);

export default dashboardRoutes;
