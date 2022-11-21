import  {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const TOKEN_KEY: string = process.env.TOKEN_SECRET as string;


// Format of Authorization: Bearer <token>
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, TOKEN_KEY)

        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;