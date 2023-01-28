import fs from "fs";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("../products.json");

export default class CartManager {
    constructor() {
        this.path = "./src/carts.json";
        this.carts = [];
    }

    async addCart(products) {
        const cart = {
            id: this.#idGenerator(),
            products: [],
        }

        if(!products) {
            console.log("Campo no rellenado")
        } else { 
            this.carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            console.log("Carrito agregado correctamente")  
        }
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

    async getProductsToCart(id, idp) {
        const cartToUpdate = await this.getCartById(id);
        if(cartToUpdate) {
            const savedCart = await this.getCarts()
            const indexId = savedCart.findIndex((element) => element.id === id)
            const idPrdc = await productManager.getProductById(idp);
            savedCart[indexId].products.push({
                product: idPrdc,
                quantity: 1,
            });

            /* NO SE EXACTAMENTE COMO AGREGAR +1 EN CANTIDAD AL REPETIR ID,
            PQ ENTIENDO QUE ESO DEBERÍA HACERSE DESDE PRODUCTMANAGER */

            await fs.promises.writeFile(this.path, JSON.stringify(savedCart))
            console.log("Producto agregado correctamente")
        } else {console.log("Inserte un ID válido")}
    }

    #idGenerator() {
        let id = 1;
        if(this.carts.length !== 0) {
            id = this.carts[this.carts.length-1].id + 1;
        } return id;
    }
}