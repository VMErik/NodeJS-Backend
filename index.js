const express = require('express');
const { faker } = require('@faker-js/faker')
const routerApi = require('./routes/index');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

// Indicamos que trabajaremos con json
app.use(express.json());

// Configuramos una lista de origenes permitidos
// const whiteList = ['http://localhost:8080', 'https://myapp.mx']
// const options = {
//     origin: (origin, callback) => {
//         if (whiteList.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Origen no permitido'));
//         }
//     }
// }
// app.use(cors(options));

// Damos acceso a todos
app.use(cors());

// Le mandamos a nuestras rutas la app
routerApi(app);

// Los middlewares de tipo error se declaran despues del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, function() {
    console.log('El servidor esta funcionando en el puerto ' + 3000);
});
