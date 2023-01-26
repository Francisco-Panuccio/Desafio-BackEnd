import fs from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./src/fileJSON.json";
        this.products = [];
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category) {
        const product = {
            id: this.#idGenerator(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true,
            category,
        }
        
        const checkCode = this.#codeChecker(code);
        if(checkCode) {
            console.log("Código repetido")
        } 
        else if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            console.log("Campo/s no rellenado/s")
        } else { 
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
/* 1) */ test.addProduct("producto prueba 1", "Este es el producto de prueba 1", 100, "Sin imagen", "abc", 20)
/* 2) */ test.addProduct("producto prueba 2", "Este es el producto de prueba 2", 200, "Con imagen", "abd", 21)
/* 3) */ test.addProduct("producto prueba 3", "Este es el producto de prueba 3", 300, "Sin imagen", "abe", 22)
/* 4) */ test.addProduct("producto prueba 4", "Este es el producto de prueba 4", 400, "Con imagen", "abf", 23)
/* 5) */ test.addProduct("producto prueba 5", "Este es el producto de prueba 5", 500, "Sin imagen", "abg", 24)
/* 6) */ test.addProduct("producto prueba 6", "Este es el producto de prueba 6", 600, "Con imagen", "abh", 25)
/* 7) */ test.addProduct("producto prueba 7", "Este es el producto de prueba 7", 700, "Sin imagen", "abi", 26)
/* 8) */ test.addProduct("producto prueba 8", "Este es el producto de prueba 8", 800, "Con imagen", "abj", 27)
/* 9) */ test.addProduct("producto prueba 9", "Este es el producto de prueba 9", 900, "Sin imagen", "abk", 28)
/* 10) */test.addProduct("producto prueba 10", "Este es el producto de prueba 10", 1000, "Con imagen", "abl", 29)
}
