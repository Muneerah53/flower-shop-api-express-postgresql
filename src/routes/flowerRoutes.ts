import { Router } from 'express';
import {
    index,
    show,
    create,
    update,
    remove,
    flowersByColor,
} from '../controllers/flowerController';
import verifyAuthToken from '../middleware/verifyToken';

const flowersRouter: Router = Router();

flowersRouter.get('/', index);
flowersRouter.get('/:flowerID', show);
flowersRouter.post('/', verifyAuthToken, create);
flowersRouter.put('/:flowerID', verifyAuthToken, update);
flowersRouter.delete('/:flowerID', verifyAuthToken, remove);
flowersRouter.get('/color/:color', flowersByColor);

export default flowersRouter;
