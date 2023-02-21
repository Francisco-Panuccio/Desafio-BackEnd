import { productsModel } from "../models/products.model.js";

export default class ProductManager {
    async addProduct(obj) {
        try {
            const newPrdc = await productsModel.create(obj);
            return newPrdc;
        } catch (error) {
            console.log("Error al Agregar el Producto", error)
        }
    }

    async getProducts() {
        try {
            const products = await productsModel.find({});
            return products;
        } catch (error) {
            console.log("No hay productos en la Base de Datos", error)
        }
    } 

    async getProductById(id) {
        try {
            const productId = await productsModel.findById(id);
            return productId;
        } catch (error) {
            console.log("Id no encontrado", error)
        }
    } 

    async updateProduct(id, field, value) {
        try {
            const prdcToUpdate = await productsModel.findByIdAndUpdate(id, {[field]: value});
            return prdcToUpdate;
        } catch (error) {
            console.log("Inserte un ID válido", error)
        }
    }

    async deleteProduct(id) {
        try {
            const prdcToDelete = await productsModel.deleteOne({_id:id});
            return prdcToDelete;
        } catch (error) {
            console.log("Producto no encontrado", error)
        }
    }
}