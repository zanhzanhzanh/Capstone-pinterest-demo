import { Request, Response } from '../config/lib'
import findObject from "../common/findObject";
import { save_image } from "../models/save_image";

const saveImageControllers = () => {
    return {
        getSaveImageByImageId: async (req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<save_image>(req, res, {
                modelPrimary: 'save_image',
                whereObject: {
                    image_id: id
                },
                includeModel: ['user', 'image']
            })
        },

        getSaveImageByUserAndImageId: async (req: Request, res: Response) => {
            let { userId, imageId } = req.params;

            await findObject<save_image>(req, res, {
                modelPrimary: 'save_image',
                whereObject: {
                    user_id: userId,
                    image_id: imageId,
                },
                includeModel: ['user', 'image']
            })
        },

        getSaveImageByUserId: async (req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<save_image>(req, res, {
                modelPrimary: 'save_image',
                whereObject: {
                    user_id: id
                },
                includeModel: ['user', 'image']
            })
        },
    }
}

export default saveImageControllers;