// Se encargara de la logica de negocio
const { faker } = require('@faker-js/faker');
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
                image: faker.image.url()
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
            }, 5000);
        });

    }

    async findOne(id) {
        return this.products.find(item => item.id === id);
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error("Product not found");
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
            throw new Error("Product not found");
        } else {
            this.products.splice(index, 1);
            return id;
        }

    }
}


module.exports = ProductsService;
