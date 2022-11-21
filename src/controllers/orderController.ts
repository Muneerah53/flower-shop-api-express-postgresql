import { Request, Response } from 'express';
import { Order, OrderModel } from '../models/order';

const Orders = new OrderModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.params.userID;
        const orders = await Orders.index(uid);
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.orderID;
        const uid = req.params.userID;

        const order = await Orders.show(id, uid);
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const showUserOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.params.userID;

        const order = await Orders.showUserOrder(uid);

        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order = {
            status: 'Active',
            user_id: req.params.userID,
        };
        const newOrder = await Orders.create(order);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order = {
            id: Number(req.params.orderID),
            status: 'Complete',
            user_id: req.params.userID,
        };
        const completedOrder = await Orders.update(order);
        res.json(completedOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const addFlower = async (_req: Request, res: Response) => {
    try {
        const orderID: string = _req.params.orderID;
        const flowerID: string = _req.body.flowerID;
        const quantity: number = parseInt(_req.body.quantity);

        const addedProduct = await Orders.addFlower(
            quantity,
            orderID,
            flowerID
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const completedOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid: string = req.params.userID;
        const completedOrders = await Orders.completedOrders(uid);
        res.json(completedOrders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export {
    index,
    show,
    showUserOrder,
    create,
    update,
    addFlower,
    completedOrders,
};
