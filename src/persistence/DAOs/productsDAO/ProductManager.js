import { productsModel } from "../../mongoDB/models/products.model.js";
import CustomError from "../../../errors/CustomError.js";
import logger from "../../../winston/winston.js";
import { ErrorsName, ErrorsMessage, ErrorsCause } from "../../../errors/errors.enum.js";

export default class ProductManager {
    async addProduct(obj) {
        try {
            const newPrdc = await productsModel.create(obj);
            return newPrdc;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.addProductError,
                message: ErrorsMessage.addProductError,
                cause: ErrorsCause.addProductError,
            })
        }
    }

    async getProducts() {
        try {
            const products = await productsModel.find({});
            return products;
        } catch (error) {
            logger.warning("No hay productos en la Base de Datos,", error)
        }
    }

    async getProductById(id) {
        try {
            const productId = await productsModel.findById(id);
            return productId;
        } catch (error) {
            logger.error("Id no encontrado,", error)
        }
    }

    async updateProduct(id, field, value) {
        try {
            const prdcToUpdate = await productsModel.findByIdAndUpdate(id, {[field]: value});
            return prdcToUpdate;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.updateProductError,
                message: ErrorsMessage.updateProductError,
                cause: ErrorsCause.updateProductError,
            })
        }
    }

    async deleteProduct(id) {
        try {
            const prdcToDelete = await productsModel.deleteOne({_id:id});
            return prdcToDelete;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.deleteProductError,
                message: ErrorsMessage.deleteProductError,
                cause: ErrorsCause.deleteProductError,
            })
        }
    }

    async logsWinston() {
        logger.fatal("Fatal Log")
        logger.error("Error Log")
        logger.warning("Warning Log")
        logger.info("Info Log")
        logger.http("Http Log")
        logger.debug("Debug Log")
    }

    async aggregationFunc(ctg, srt) {
        try {
            if(!ctg) {
                return {message:"Producto no encontrado"}
            } else {
                const ctgy = await productsModel.aggregate([
                    {   
                        $match: {category: {$eq: `${ctg}`}}
                    },
                    {
                        $sort: {price: srt}
                    }
                ])
                return ctgy;
            }
        } catch (error) {
            logger.error(error)
        }
    }

        async aggregationFunc2(stc, srt) {
        try {
            if(!stc) {
                return {message:"Producto no encontrado"}
            } else {
                const stck = await productsModel.aggregate([
                    {   
                        $match: {stock: {$eq: stc}}
                    },
                    {
                        $sort: {price: srt}
                    }
                ])
                return stck;
            }
        } catch (error) {
            logger.error(error)
        }
    }
}