const express = require('express');
const { faker } = require('@faker-js/faker')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola desde mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola desde mi nueva ruta');
});


app.get('/products', (req, res) => {
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
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id: id, // Obtenemos el id de los params
        name: "Producto 1",
        price: 500
    });
});





app.get('/users', (req, res) => {
    const { region } = req.query;
    if (region) {
        res.json({
            region
        });
    } else {
        res.send('No hay parametros')
    }
});

// Retornar productos de una categoria
app.get('/categories/:categoryId/products/:productId', (req, res) => {
    // obtenemos a traves de desestructuracion de la url
    const { categoryId, productId } = req.params;
    res.json({
        categoryId: categoryId,
        category: "Categoria",
        productId: productId,
        product: "Productoooo"
    });
});



app.listen(port, function() {
    console.log('El servidor esta funcionando en el puerto ' + 3000);
});
