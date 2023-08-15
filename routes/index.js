const express = require('express');
// Router general del proyecto
const productsRouter = require('./products.router')

function routerApi(app) {

    const router = express.Router();
    // Indicamos un path global
    app.use('/api/v1', router);
    // Especficamos la ruta de acceso y el roter al que se llamara
    router.use('/products', productsRouter);
}

module.exports = routerApi;
