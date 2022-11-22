import { Router } from 'express';
import {
    index,
    show,
    create,
    authenticate,
} from '../controllers/userController';
import verifyAuthToken from '../middleware/verifyToken';

const userRouter: Router = Router();

userRouter.get('/', verifyAuthToken, index);
userRouter.get('/:userID', verifyAuthToken, show);
userRouter.post('/', create);
userRouter.post('/authenticate', authenticate);

export default userRouter;
