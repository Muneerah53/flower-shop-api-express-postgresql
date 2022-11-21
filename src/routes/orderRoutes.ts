import { Router } from 'express';
import {
    index,
    show,
    showUserOrder,
    create,
    update,
    addFlower,
    completedOrders,
} from '../controllers/orderController';
import verifyAuthToken from '../middleware/verifyToken';

const orderRouter: Router = Router({ mergeParams: true });

orderRouter.get('/', verifyAuthToken, index);
orderRouter.get('/:orderID', verifyAuthToken, show);
orderRouter.get('/show/current-order', verifyAuthToken, showUserOrder);
orderRouter.get('/show/history', verifyAuthToken, completedOrders);

orderRouter.post('/', verifyAuthToken, create);
orderRouter.put('/:orderID/complete', verifyAuthToken, update);
orderRouter.post('/:orderID/flowers', verifyAuthToken, addFlower);

export default orderRouter;
