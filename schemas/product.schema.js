const joi = require('joi');

// Creamos nuestro esquema solo con definiciones , abajo se especificaran requireds
const id = joi.string().alphanum();
const name = joi.string().alphanum().min(3).max(50);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

// Definimos nuestra esquema para la creacion
const createProductSchema = joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});


const updateProductSchema = joi.object({
    name: name,
    price: price,
});


const getProductSechema = joi.object({
    id: id.required()
});


// Exportamos nuestros esquemas
module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSechema
}
