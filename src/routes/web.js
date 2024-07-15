import express from 'express'
import homeController from '../controller/homeController';

const router = express.Router();

/**
 * @param {*} app: express app
 */
const initWebRouters = (app) => {
    router.get('/', homeController.handleGetdata);
    router.get('/user', homeController.handleUserdata);
    // router.get('/about', (req, res) => {
    //     return res.send('I am Tom');
    // })

    return app.use('/jwt/api', router);
};

export default initWebRouters;