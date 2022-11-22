import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import jwt from 'jsonwebtoken';

const Users = new UserModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await Users.index();
        res.json(users);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.userID;
        const user = await Users.show(id);
        res.json(user);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await Users.create(user);
        var token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string
        );
        res.json({ ...user, token });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
const authenticate = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };

        const authenticated = await Users.authenticate(user);
        if (!authenticated) {
            res.status(401);
            res.json('Invalid password');
        } else {
            var token = jwt.sign(
                { user: authenticated },
                process.env.TOKEN_SECRET as string
            );
            res.json(token);
        }
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
export { index, show, create, authenticate };
