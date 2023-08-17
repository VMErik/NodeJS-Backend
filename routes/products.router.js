// Router especifico para productos

const express = require('express');
// Importamos servicio /  Logica de negoci
const ProductsService = require('./../services/product.service');
// Importamos nuestro middleware para validacion de esquemas de product
const validatorHandler = require('./../middlewares/validator.handler');
// importamos nuestros esquemas
const { createProductSchema, updateProductSchema, getProductSechema } = require('./../schemas/product.schema')

const router = express.Router();
const service = new ProductsService();

router.get('/', async(req, res, next) => {
    try {
        const { size } = req.query;
        const products = await service.find();
        res.json(products);
    } catch (error) {
        next(error);
    }

});


// Recibiremos un parametro indicandolo con :_nombre_
// POnemos como tercer parametro el middleware
// Definimos la ruta, luego el middleware (pasamos esquema), luego nuestro next
router.get('/:id', validatorHandler(getProductSechema, 'params'), async(req, res, next) => {
    try {
        const { id } = req.params;
        if (id === '999') {
            // Simulacion not found
            res.status(404).json({ message: 'Not Found' });
        } else {
            const product = await service.findOne(id);
            res.json({
                product
            });
        }
    } catch (error) {
        // Ejecutamos el middleware de error
        next(error);
    }

});


// Recibe cuerpo
// Le pasams nuestro middleware
router.post('/', validatorHandler(createProductSchema, 'body'), async(req, res, next) => {

    try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json({
            message: 'created',
            data: newProduct
        });
    } catch (error) {
        next(error);
    }

});


// Recibe cuerpo y param
// En este caso mandaremos dos middlewares, uno para la validacion del id y el oro del body
// Si todo esta correcto en el primer middleware pasaremos al segundo y si esta ok, pasaremos a la ejecucion del endpoint
router.patch('/:id', validatorHandler(getProductSechema, 'params'), validatorHandler(updateProductSchema, 'body'), async(req, res, next) => {

    try {
        const { id } = req.params;
        const body = req.body;

        const updatedProduct = await service.update(id, body);

        res.json({
            updatedProduct
        })
    } catch (error) {
        next(error);
    }

});


// No recibe cuerpo
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json({
            response
        })
    } catch (error) {
        next(error);
    }

});


module.exports = router;


// router.get('/users', (req, res) => {
//     const { region } = req.query;
//     if (region) {
//         res.json({
//             region
//         });
//     } else {
//         res.send('No hay parametros')
//     }
// });

// // Retornar productos de una categoria
// router.get('/categories/:categoryId/products/:productId', (req, res) => {
//     // obtenemos a traves de desestructuracion de la url
//     const { categoryId, productId } = req.params;
//     res.json({
//         categoryId: categoryId,
//         category: "Categoria",
//         productId: productId,
//         product: "Productoooo"
//     });
// });
