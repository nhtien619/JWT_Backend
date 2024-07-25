import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouters from './routes/web';
import bodyParser from 'body-parser';
//import connection from './config/connectDB';

//? define to process.env
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8083;

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