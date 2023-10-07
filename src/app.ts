// Import modules
import { app } from './config/lib';
import { PORT } from './config/configServer'
import getAllRouters from './routers/routers.web';

// Get all routers
getAllRouters();

// Listen on PORT
app.listen(PORT, () => {
    console.log("Listen on PORT:", PORT);
})