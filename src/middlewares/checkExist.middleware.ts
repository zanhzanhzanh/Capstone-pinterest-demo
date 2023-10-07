import { ResponseObject } from "../common/responseObject";
import { Request, Response, NextFunction } from '../config/lib';
import { model } from "../config/configServer";
import jwt from 'jsonwebtoken';

// Check Exist Object before Using for Controller
const checkExistMiddle = (modelCheck?: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const apiObj = Object.keys(req.params).length !== 0 ? req.params : req.body;

        let i: number = 0;
        for(const key in apiObj) {
            if(i === modelCheck.length) break;

            // Take User from JWT Token
            if(modelCheck[i] === 'user' && req.method !== 'PUT') {
                let tokenUser : jwt.JwtPayload = <jwt.JwtPayload>jwt.decode(<string>req.headers.token);
                delete tokenUser.iat;
                delete tokenUser.exp;
                
                // Compare User Id
                if(Number(apiObj[key]) === tokenUser.user_id) {
                    // Assign Data
                    req.body.userStore = tokenUser;
                    i++;
                    continue;
                }
            }

            // Format for Where Condition
            let objectId: string = modelCheck[i] + '_id';
            let whereObj = {} 
            // Disadvantages need to be transmitted in the correct order
            whereObj[objectId] = apiObj[key]

            let takeModel = model[modelCheck[i]]
            // Find Object
            let getData: (typeof takeModel)[] = await takeModel.findOne({
                where: whereObj,
            });

            // Check Exist
            if(!getData) {
                return res.status(404).send(new ResponseObject<[]>(404, `Not exist ${modelCheck[i]}`, []))
            }

            // Assign Data
            const nameData: string = modelCheck[i] + 'Store';
            req.body[nameData] = getData;

            i++;
        }

        next();
    }
}

export default checkExistMiddle;