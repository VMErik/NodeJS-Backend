const express = require('express');
const { faker } = require('@faker-js/faker')
const routerApi = require('./routes/index');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

// Indicamos que trabajaremos con json
app.use(express.json());

// Le mandamos a nuestras rutas la app
routerApi(app);

// Los middlewares de tipo error se declaran despues del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, function() {
    console.log('El servidor esta funcionando en el puerto ' + 3000);
});
