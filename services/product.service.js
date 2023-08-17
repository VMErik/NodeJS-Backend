// Se encargara de la logica de negocio
const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

class ProductsService {


    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: index.toString(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean()
            });
        }

    }

    async create(data) {
        const newProduct = {
            id: "101",
            // Concatenamos los otros valores
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find() {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 2000);
        });

    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            return boom.notFound("Product Not Found");
        }
        if (product.isBlock) {
            return boom.conflict("Product Is Block");
        }
        return product;
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product Not Found')
        } else {
            const product = this.products[index];
            // Persistimos la informacion que ya se tenia, y guardamos lo nuevo
            this.products[index] = {
                ...product,
                ...changes
            }
            return this.products[index];
        }

    }
    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("Product not found");
        } else {
            this.products.splice(index, 1);
            return id;
        }

    }
}


module.exports = ProductsService;
