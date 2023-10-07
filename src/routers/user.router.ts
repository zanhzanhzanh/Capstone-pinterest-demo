import { upload } from '../config/configServer';
import { router } from '../config/lib'
import userControllers from "../controllers/user.controlller";
import checkExistMiddle from '../middlewares/checkExist.middleware';
import validateUser from '../middlewares/validateUser.middleware';

const userRouter = () => {
    const modules = userControllers();

    router.post('/login', validateUser('login'), modules.loginUser);
    router.post('/register', validateUser('register'), modules.registerUser);
    router.get('/user', modules.getAllUser);
    router.get('/user/:id(\\d+)', modules.getUserById);
    router.put('/user/:id(\\d+)', upload.single('avatar'), checkExistMiddle(['user']), validateUser('update'), modules.updateUser);
}

export default userRouter;