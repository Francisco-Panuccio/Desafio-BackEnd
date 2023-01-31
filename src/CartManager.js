import fs from "fs";

export default class CartManager {
    constructor() {
        this.path = "./src/carts.json";
        this.carts = [];
    }

    async addCart() {
        const cart = {
            id: this.#idGenerator(),
            products: []
        }
        this.carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    }

    async getCarts() {
        if(fs.existsSync(this.path)) {
            const readInfo = await fs.promises.readFile(this.path, "utf-8");
            const savedInfo = JSON.parse(readInfo);
            return savedInfo;
        } else {
            console.log("Archivo no encontrado")
            return this.carts;
        }   
    }

    async getCartById(id) {
        const savedInfoId = await this.getCarts();
        const cartId = savedInfoId.find(elem => elem.id === id)
        if(cartId !== undefined) {
            return cartId;
        } else (console.log("Id no encontrado"))
    }

    async addToCart(cid, pid) {
        const carts = await this.getCarts();
        const indexCart = carts.find(elm => elm.id === cid);
        if(indexCart) {
            const indexPrdc = indexCart.products.findIndex((element) => element.product === pid)
            if(indexPrdc !== -1) {
                indexCart.products[indexPrdc].quantity += 1
            } else {
                let id = 1;
                if(indexCart.products.length > 0) {
                    id = indexCart.products[indexCart.products.length-1].product + 1;
                }
                indexCart.products.push({
                    product: id,
                    quantity: 1,
                })
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
        } else {
            console.log("Carrito no encontrado")
        }
    }   

    #idGenerator() {
        let id = 1;
        if(this.carts.length !== 0) {
            id = this.carts[this.carts.length-1].id + 1;
        } return id;
    }
}

const test = new CartManager();
const prueba = () => {
    test.addToCart(2,1)
}
