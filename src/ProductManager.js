import fs from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./src/products.json";
        this.products = [];
    }

    async addProduct(title, description, code, price, status = true, stock, category, thumbnail) {
        const product = {
            id: this.#idGenerator(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail: [],
        }

        const checkCode = this.#codeChecker(code);
        if(checkCode) {
            console.log("Código repetido")
        } 
        else if(!title && !description && !code && !price && !status && !stock && !category) {
            console.log("Campo/s no rellenado/s")
        } else { 
            product.thumbnail.push(thumbnail);
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log("Producto agregado correctamente")  
        }
    }

    async getProducts() {
        if(fs.existsSync(this.path)) {
            const readInfo = await fs.promises.readFile(this.path, "utf-8");
            const savedInfo = JSON.parse(readInfo);
            return savedInfo;
        } else {
            console.log("Archivo no encontrado")
            return this.products;
        }   
    }

    async getProductById(id) {
        const savedInfoId = await this.getProducts();
        const productId = savedInfoId.find(elem => elem.id === id)
        if(productId !== undefined) {
            return productId;
        } else (console.log("Id no encontrado"))
    }

    async updateProduct(id, field, value) {
        const prdcToUpdate = await this.getProductById(id);
        if(prdcToUpdate) {
            const savedPrdct = await this.getProducts();
            const indexId = savedPrdct.findIndex((element) => element.id === id)
            savedPrdct[indexId][field] = value;
            await fs.promises.writeFile(this.path, JSON.stringify(savedPrdct));
            console.log("Archivo actualizado correctamente")
        } else {console.log("Inserte un ID válido")}
    }

    async deleteProduct(id) {
        const prdcToDelete = await this.getProductById(id);
        if(prdcToDelete) {
            const savedPrdct = await this.getProducts();
            const indexId = savedPrdct.findIndex((element) => element.id === id)
            console.log(`El archivo se ha eliminado correctamente`)
            savedPrdct.splice(indexId,1)
            await fs.promises.writeFile(this.path, JSON.stringify(savedPrdct));
        } else {
            console.log("Archivo no encontrado")
        }
    }

    #idGenerator() {
        let id = 1;
        if(this.products.length !== 0) {
            id = this.products[this.products.length-1].id + 1;
        } return id;
    }

    #codeChecker(code) {
        return this.products.find(prod => prod.code === code)
    }
}

const test = new ProductManager();
const prueba = () => {
/* 1) */ test.addProduct("Prueba 1", "Producto de prueba 1", "abc", 100, true, 20, "Producto", "./src/public/1.png")
/* 2) */ test.addProduct("Prueba 2", "Producto de prueba 2", "abd", 200, true, 21,  "Producto")
/* 3) */ test.addProduct("Prueba 3", "Producto de prueba 3", "abe", 300, true, 22, "Producto", "/src/public/2.png")
/* 4) */ test.addProduct("Prueba 4", "Producto de prueba 4", "abf", 400, true, 23,  "Producto")
/* 5) */ test.addProduct("Prueba 5", "Producto de prueba 5", "abg", 500, true, 24,  "Producto", "/src/public/2.png")
/* 6) */ test.addProduct("Prueba 6", "Producto de prueba 6", "abh", 600, true, 25,  "Producto", "/src/public/1.png")
/* 7) */ test.addProduct("Prueba 7", "Producto de prueba 7", "abi", 700, true, 26, "Producto", "/src/public/1.png")
/* 8) */ test.addProduct("Prueba 8", "Producto de prueba 8", "abj", 800, true, 27, "Producto")
/* 9) */ test.addProduct("Prueba 9", "Producto de prueba 9", "abk", 900, true, 28, "Poducto", "/src/public/2.png")
/* 10) */test.addProduct("Prueba 10", "Producto de prueba 10", "abl", 1000, true, 29, "Producto", "/src/public/2.png")
}
