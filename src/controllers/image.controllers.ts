import { Request, Response } from '../config/lib'
import { model } from '../config/configServer';
import { ResponseObject } from '../common/responseObject'
import Sequelize from 'sequelize';
import { image } from '../models/image';
import findObject from '../common/findObject';
import { uploadImage, getImage, delImage } from '../common/bucketModules';

const Op = Sequelize.Op;

const imageControllers = () => {
    return {
        getAllImage: async (req: Request, res: Response) => {
            try {
                let getData: image[] = await model.image.findAll({
                    include: [
                        {
                            model: model['user'],
                            as: 'user',
                        }
                    ]
                });

                for(const data of getData) {
                    data.path = await getImage(data.image_name, 604800);
                    data.user.path = await getImage(data.user.avatar, 604800);
                }
                
                res.status(200).send(new ResponseObject<image[]>(200, 'Success', getData));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        getImageByName: async (req: Request, res: Response) => {
            let { imageName } = req.params;

            await findObject<image>(req, res, {
                modelPrimary: 'image',
                whereObject: {
                    image_name: {
                        [Op.like]: `%${imageName}%`
                    }
                },
                includeModel: ['user']
            })
        },

        getImageById: async (req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<image>(req, res, {
                modelPrimary: 'image',
                whereObject: {
                    image_id: id
                },
                includeModel: ['user']
            })
        },

        getImageByUserId: async (req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<image>(req, res, {
                modelPrimary: 'image',
                whereObject: {
                    user_id: id
                },
                includeModel: ['user']
            })
        },

        createImage:async (req: Request, res: Response) => {
            try {
                const imageName: string = await uploadImage(req.file);

                // Save to db
                const newImage = await model.image.create({ 
                    image_name: imageName,
                    path: 'No path',
                    desc: req.body.desc,
                    user_id: req.body.user_id,
                })

                newImage.path = await getImage(newImage.image_name, 604800);

                res.status(200).send(new ResponseObject<image[]>(200, 'Success', [newImage]))
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        deleteImage:async (req: Request, res: Response) => {
            try {
                // Delete File from S3
                await delImage(req.body.imageStore.image_name)

                // Delete from db
                let { id } = req.params;
                await model.image.destroy({
                    where: {
                        image_id: id
                    }
                });

                res.status(200).send(new ResponseObject<[]>(200, 'Success Deleted', []));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    }
}

export default imageControllers;