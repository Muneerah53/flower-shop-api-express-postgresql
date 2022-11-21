import { Request, Response } from 'express';
import { Flower, FlowerModel } from '../models/flower';

const Flowers = new FlowerModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const flowers = await Flowers.index();
        res.json(flowers);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.flowerID;
        const flower = await Flowers.show(id);
        res.json(flower);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const flower: Flower = {
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
        };
        const newFlower = await Flowers.create(flower);
        res.json(newFlower);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const flower: Flower = {
            id: Number(req.params.flowerID),
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
        };
        const updatedFlower = await Flowers.update(flower);
        res.json(updatedFlower);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.flowerID;
        const deletedFlower = await Flowers.delete(id);
        res.json(deletedFlower);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const flowersByColor = async (req: Request, res: Response): Promise<void> => {
    try {
        const color = req.params.color;
        const foundFlowers = await Flowers.flowersByColor(color);
        res.json(foundFlowers);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};
export { index, show, create, update, remove, flowersByColor };
