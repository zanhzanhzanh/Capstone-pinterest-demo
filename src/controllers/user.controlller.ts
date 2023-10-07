import { Request, Response } from '../config/lib'
import { model } from '../config/configServer';
import findObject from "../common/findObject";
import { ResponseObject } from "../common/responseObject";
import { user } from "../models/user";
import jwt from 'jsonwebtoken';
import { uploadImage, getImage, delImage } from '../common/bucketModules';
import bcrypt from 'bcrypt';

const userControllers = () => {
    return {
        loginUser: async (req: Request, res: Response) => {
            try {
                const { password, userStore } = req.body;

                // Check password
                if(!bcrypt.compareSync(password, userStore.password)) {
                    return res.status(401).send(new ResponseObject<[]>(401, `Wrong password`, []));
                }

                // Create Link Avatar
                userStore.path = await getImage(userStore.avatar, 604800);

                let initToken: string = jwt.sign(userStore.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: "5m" });

                res.status(200).send(new ResponseObject<any[]>(200, 'Success Login', [{ token: initToken }]));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        registerUser: async (req: Request, res: Response) => {
            try {
                // Get all attr
                const { email, password, username, age } = req.body;

                // Assign Default Avatar
                const url: string = await getImage('defaultAvatar.png', 604800);

                // Add New User
                const newUser: user = await model.user.create({
                    email, password: bcrypt.hashSync(password, 10), username, age, avatar: 'defaultAvatar.png', path: 'No path'
                });

                newUser.path = url;

                res.status(200).send(new ResponseObject<user[]>(200, 'Success Create', [newUser]));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        getAllUser: async (req: Request, res: Response) => {
            try {
                let getData = await model.user.findAll();

                for(const data of getData) {
                    const url = await getImage(data.avatar, 604800)
                    data.path = url;
                }
                
                res.status(200).send(new ResponseObject<user[]>(200, 'Success', getData));
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        },

        getUserById: async(req: Request, res: Response) => {
            let { id } = req.params;

            await findObject<user>(req, res, {
                modelPrimary: 'user',
                whereObject: {
                    user_id: id
                },
            })
        },

        updateUser: async(req: Request, res: Response) => {
            try {
                let { username, email, password, age } = req.body;

                // Get Detail User
                let detailUser: user = req.body.userStore;

                const imageName: string = await uploadImage(req.file);

                const url: string = await getImage(imageName, 604800);

                // Delete Old Image (Except Default)
                if(detailUser.avatar !== 'defaultAvatar.png') { await delImage(detailUser.avatar); }

                // Re-assign value
                detailUser.username = username;
                detailUser.email = email;
                detailUser.password = bcrypt.hashSync(password, 10);
                detailUser.age = age;
                detailUser.avatar = imageName;

                // Update
                await detailUser.save();

                detailUser.path = url;
            
                res.status(200).send(new ResponseObject<user[]>(200, 'Success Updated', [detailUser]));
            } catch(error) {
                console.log(error);
                res.status(500).send(error);
            }
        },
    }
}

export default userControllers;