import { ResponseObject } from "../common/responseObject";
import { Request, Response, NextFunction } from '../config/lib';
import { model } from "../config/configServer";
import { user } from "../models/user";

async function findOneUser(email: string) {
    return await model.user.findOne({
        where: {
            email,
        }
    });
}

const validateUser = (context: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        
        // Check Regex
        if(!String(email).toLowerCase().match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')) {
            return res.status(400).send(new ResponseObject<[]>(400, `Wrong email syntax!`, []));
        }

        // Check Email for Update and Register
        if(context === 'update' || context === 'register') {
            // Check Age
            if(req.body.age <= 0) {
                return res.status(400).send(new ResponseObject<[]>(400, `Age must be greater than 0`, []));
            }
            
            if((context === 'update' && req.body.userStore.email != email) || context === 'register') {
                const checkEmail: user = await findOneUser(email);
    
                if(checkEmail) return res.status(400).send(new ResponseObject<[]>(400, `Email has been taken!`, []));
            }
        }

        // Check Email for login
        if(context === 'login') {
            const checkEmail: user = await findOneUser(email);
            
            // Assign for Reuse Obj
            req.body.userStore = checkEmail;

            if(!checkEmail) return res.status(400).send(new ResponseObject<[]>(400, `Not found user with email = ${email}`, []));
        }

        next();
    }
}

export default validateUser;