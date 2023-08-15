const express = require('express');
const { faker } = require('@faker-js/faker')
const routerApi = require('./routes/index');
const app = express();
const port = 3000;

// Indicamos que trabajaremos con json
app.use(express.json());

// Le mandamos a nuestras rutas la app
routerApi(app);


app.listen(port, function() {
    console.log('El servidor esta funcionando en el puerto ' + 3000);
});
