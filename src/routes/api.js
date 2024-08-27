import express from 'express'
import homeController from '../controller/homeController';
import userController from '../controller/userController';

const router = express.Router();

/**
 * @param {*} app: express app
 */
const initApiRouters = (app) => {
    router.get('/test-api', userController.testApiData);
    router.post('/register', userController.handleRegister);

    return app.use('/api/v1/', router);
};

export default initApiRouters;