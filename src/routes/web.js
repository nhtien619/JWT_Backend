import express from 'express'
import homeController from '../controller/homeController';

const router = express.Router();

/**
 * @param {*} app: express app
 */
const initWebRouters = (app) => {
    router.get('/', homeController.handleGetdata);
    router.get('/user', homeController.handleUserPage);
    router.post('/users/create-user', homeController.handleCreatNewUser);
    router.get('/users/delete-user/:id', homeController.handleDeleteUser);
    router.get('/users/user-detail/:id', homeController.handleUserInfo);
    router.post('/users/update-user/:id', homeController.handleUpdateUser);
    // router.get('/about', (req, res) => {
    //     return res.send('I am Tom');
    // })
    return app.use('/', router);
};

export default initWebRouters;