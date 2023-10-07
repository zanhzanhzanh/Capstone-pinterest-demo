import { Request, Response, NextFunction } from '../config/lib';
import { ResponseObject } from "../common/responseObject";
import jwt from 'jsonwebtoken';

const checkTokenMiddle = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.url === '/login' || req.url === '/register') return next();

        let { token } = req.headers;

        if(jwt.verify(<string>token, process.env.JWT_SECRET_KEY)) next();
    } catch (error) {
        console.log(error);
        res.status(403).send(new ResponseObject<[]>(403, "You don't have permission to access", []));
    }
}

export default checkTokenMiddle;