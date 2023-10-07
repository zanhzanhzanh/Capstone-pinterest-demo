import { router } from '../config/lib'
import commentControllers from "../controllers/comment.controller";
import checkExistMiddle from "../middlewares/checkExist.middleware";

const commentRouter = () => {
    const modules = commentControllers();

    router.get('/comment/queryId/:id(\\d+)', checkExistMiddle(['image']), modules.getCommentByImageId);
    router.post('/comment/create', checkExistMiddle(['user', 'image']), modules.createComment);
}

export default commentRouter;