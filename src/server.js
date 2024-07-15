import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRouters from './routes/web';

const app = express();

// config view engine
configViewEngine(app);
//init web routers
initWebRouters(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
});