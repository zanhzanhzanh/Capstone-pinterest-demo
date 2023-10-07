import { app, router } from '../config/lib'
import userRouter from "./user.router";
import imageRouter from "./image.router";
import commentRouter from "./comment.router";
import saveImageRouter from "./save_image.router";
import checkTokenMiddle from '../middlewares/checkToken.middleware';

const routers = () => {
    router.all('/*', checkTokenMiddle);

    userRouter();
    imageRouter();
    commentRouter();
    saveImageRouter();
    
    // Tạo tiền tố cho các router
    return app.use('/', router);
}

export default routers;