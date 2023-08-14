// Router especifico para productos

const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();


router.get('/', (req, res) => {
    const products = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url()
        });
    }

    res.json(products);
});


// Recibiremos un parametro indicandolo con :_nombre_
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id: id, // Obtenemos el id de los params
        name: "Producto 1",
        price: 500
    });
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
