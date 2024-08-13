import express from 'express'
import homeController from '../controller/homeController';
import testApiController from '../controller/testApiController';

const router = express.Router();

/**
 * @param {*} app: express app
 */
const initApiRouters = (app) => {
    router.get('/test-api', testApiController.testApiData);
    router.post('/register', testApiController.handleRegister);

    return app.use('/api/', router);
};

export default initApiRouters;