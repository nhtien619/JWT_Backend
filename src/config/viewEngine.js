import express from 'express'

/**
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    //? define use view engine is ejs
    app.set("view engine", 'ejs');
    //? define use views
    app.set("views", './src/views')
}

export default configViewEngine;