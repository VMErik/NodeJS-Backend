// Router especifico para productos

const express = require('express');
// Importamos servicio /  Logica de negoci
const ProductsService = require('./../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async(req, res) => {
    const { size } = req.query;
    const products = await service.find();
    res.json(products);
});


// Recibiremos un parametro indicandolo con :_nombre_
router.get('/:id', async(req, res) => {
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
        res.status(404).json({
            message: error.message
        });
    }

});


// Recibe cuerpo
router.post('/', async(req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
        message: 'created',
        data: newProduct
    });
});


// Recibe cuerpo y param
router.patch('/:id', async(req, res) => {

    try {


        const { id } = req.params;
        const body = req.body;

        const updatedProduct = await service.update(id, body);

        res.json({
            updatedProduct
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

});


// No recibe cuerpo
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json({
        response
    })
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
