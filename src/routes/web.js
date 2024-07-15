import express from 'express'

const router = express.Router();

/**
 * @param {*} app: express app
 */
const initWebRouters = (app) => {
    router.get('/', (req, res) => {
        //console.log('res: ', res);
        //console.log('req: ', req);
        return res.send('hello world !!');
    })

    return app.use('/', router);
};

export default initWebRouters;