// Router general del proyecto
const productsRouter = require('./products.router')

function routerApi(app) {
    // Especficamos la ruta de acceso y el roter al que se llamara
    app.use('/api/products', productsRouter);
}

module.exports = routerApi;
