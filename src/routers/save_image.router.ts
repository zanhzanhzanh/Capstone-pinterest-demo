import { router } from '../config/lib'
import saveImageControllers from "../controllers/save_image.controller";
import checkExistMiddle from "../middlewares/checkExist.middleware";

const saveImageRouter = () => {
    const modules = saveImageControllers()

    router.get('/saveImage/queryImageId/:id(\\d+)', checkExistMiddle(['image']), modules.getSaveImageByImageId);
    router.get('/saveImage/queryUserId/:id(\\d+)', checkExistMiddle(['user']), modules.getSaveImageByUserId);
    router.get('/saveImage/queryUserImageId/:userId(\\d+)/:imageId(\\d+)', checkExistMiddle(['user', 'image']), modules.getSaveImageByUserAndImageId);
}

export default saveImageRouter;