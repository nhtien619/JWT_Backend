import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouters from './routes/web';
import bodyParser from 'body-parser';

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8083;

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routers
initWebRouters(app);


app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
});