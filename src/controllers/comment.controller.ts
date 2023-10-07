import { Request, Response } from '../config/lib'
import { model } from '../config/configServer';
import findObject from "../common/findObject";
import { ResponseObject } from "../common/responseObject";
import { comment } from "../models/comment";

const commentControllers = () => {
    return {
        getCommentByImageId: async (req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<comment>(req, res, {
                modelPrimary: 'comment',
                whereObject: {
                    image_id: id
                },
                includeModel: ['user', 'image']
            })
        },

        createComment: async (req: Request, res: Response) => {
            try {
                let { user_id, image_id, content } = req.body;
                let date_comment: Date = new Date();
    
                const newComment: comment = await model.comment.create({ user_id, image_id, date_comment, content })
            
                res.status(200).send(new ResponseObject<comment[]>(200, 'Success', [newComment]));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    }
}

export default commentControllers;