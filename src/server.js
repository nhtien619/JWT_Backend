import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouters from './routes/web';
import bodyParser from 'body-parser';
//import connection from './config/connectDB';

//? define to process.env
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8083;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.RECT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/**
 *? Config view engine 
 **/
configViewEngine(app);

/**
 *? config body-parser
 **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** 
 *? init web routers
*/
initWebRouters(app);

/**
 * ? test connection db
 */

//connection();


app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
});