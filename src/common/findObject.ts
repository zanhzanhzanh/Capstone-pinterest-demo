import { Request, Response } from "express";
import { model } from '../config/configServer';
import { ResponseObject } from "./responseObject";
import { image } from "../models/image";
import { save_image } from "../models/save_image";
import { comment } from "../models/comment";
import { user } from "../models/user";
import { getImage } from '../common/bucketModules';

interface RequireObject {
    modelPrimary: string,
    whereObject?: object,
    includeModel?: string[] 
}

const findObject = async <T>(req: Request, res: Response, requireObject: RequireObject) => {
    try {
        let includeModel: object[] = requireObject.includeModel === undefined ? [] :
        requireObject.includeModel.map(index => ({
            model: model[index],
            as: index
        }))
        
        let getData: T[] = await model[requireObject.modelPrimary].findAll({
            where: requireObject.whereObject,
            include: includeModel
        });
        
        if(getData.length === 0) {
            return res.status(404).send(new ResponseObject<[]>(404, `Not found ${requireObject.modelPrimary}`, []));
        }

        // Exception of User
        if(getData[0] instanceof user) {
            for(const data of getData as user[]) {
                data.path = await getImage(data.avatar, 604800);
            }
        }

        // Exception of Image
        if(getData[0] instanceof image) {
            for(const data of getData as image[]) {
                data.path = await getImage(data.image_name, 604800);
                data.user.path = await getImage(data.user.avatar, 604800);
            }
        }

        // Exception for includeModel have Image
        if(getData[0] instanceof save_image || getData[0] instanceof comment) {
            for(const data of getData as save_image[] | comment[]) {
                data.image.path = await getImage(data.image.image_name, 604800);
                data.user.path = await getImage(data.user.avatar, 604800);
            }
        }
        
        res.status(200).send(new ResponseObject<T[]>(200, 'Success', getData));
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export default findObject;