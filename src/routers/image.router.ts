import { router } from '../config/lib'
import { upload } from '../config/configServer';
import imageControllers from "../controllers/image.controllers";
import checkExistMiddle from "../middlewares/checkExist.middleware";

const imageRouter = () => {
    const modules = imageControllers();

    router.get('/image', modules.getAllImage);
    router.get('/image/queryName/:imageName', modules.getImageByName);
    router.get('/image/queryId/:id(\\d+)', modules.getImageById);
    router.get('/image/queryUserId/:id(\\d+)', checkExistMiddle(['user']), modules.getImageByUserId);
    router.post('/image', upload.single('image'), modules.createImage);
    router.delete('/image/:id(\\d+)', checkExistMiddle(['image']), modules.deleteImage);
}

export default imageRouter;