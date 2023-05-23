import { cartsModel } from "../../mongoDB/models/carts.model.js";
import { productsModel } from "../../mongoDB/models/products.model.js";
import { ticketsModel } from "../../mongoDB/models/tickets.model.js";
import randomCode from "../../../public/functions/randomCode.js"
import CustomError from "../../../errors/CustomError.js";
import logger from "../../../winston/winston.js";

export default class CartManager {
    async addCart(obj) {
        try {
            const newCart = await cartsModel.create(obj);
            return newCart;
        } catch (error) {
            logger.error("Error al Agregar el Carrito", error)
        }
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find({});
            return carts;
        } catch (error) {
            logger.warning("No hay carritos en la Base de Datos", error)
        }
    } 

    async getCartById(id) {
        try {
            const cartId = await cartsModel.find({_id:id});
            return cartId;
        } catch (error) {
            logger.info("Id no encontrado", error)
        }
    } 

    async addToCart(cid, pid) {
        try {
            const idCart = await cartsModel.findById(cid);
            if(idCart) {
                const idPrdc = idCart.products.findIndex((element) => element.product == pid);
                if(idPrdc !== -1) {
                    const prdStock = await productsModel.findById(pid)
                    if(prdStock.stock > 0) {
                        const updQty = cartsModel.updateOne(
                            {_id: cid, "products.product": pid},
                            {$inc: {"products.$.quantity": 1}}
                        )
                        return (updQty);
                    } else {
                        return("Stock Insuficiente")
                    }
                } else {
                    const pushPrdc = cartsModel.updateOne(
                        {_id: cid},
                        { $push: {"products":
                            {product: pid,
                            quantity: 1}
                        }}
                    )
                    return pushPrdc;
                }
            }
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.addToCartError,
                message: ErrorsMessage.addToCartError,
                cause: ErrorsCause.addToCartError,
            })
        }
    }

    async deletePrdcCart(cid, pid) {
        try {
            const cartPrdc = await cartsModel.findById(cid)
            const prdcIndex = cartPrdc.products.findIndex((element) => element.product == pid);
            cartPrdc.products.splice(prdcIndex,1);
            const newCart = await cartPrdc.save();
            return newCart;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.deletePrdcCartError,
                message: ErrorsMessage.deletePrdcCartError,
                cause: ErrorsCause.deletePrdcCartError,
            })
        }
    }

    async deleteAllPrdcts(cid) {
        try {
            const cartPrdc = await cartsModel.findById(cid)
            cartPrdc.products.splice(0);
            const newCart = await cartPrdc.save();
            return newCart;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.deletePrdcsError,
                message: ErrorsMessage.deletePrdcsError,
                cause: ErrorsCause.deletePrdcsError,
            })
        }
    }

    async updatePrdctCart(cid, pid, qnt) {
        try {
            const cartPrdc = await cartsModel.findById(cid)
            if(cartPrdc) {
                const updQty = cartsModel.updateOne(
                    {"products.product": pid},
                    {$set: {"products.$.quantity": parseInt(qnt)}}
                )
                return updQty;
            }
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.updatePrdcCartError,
                message: ErrorsMessage.updatePrdcCartError,
                cause: ErrorsCause.updatePrdcCartError,
            })
        }
    }

    async updateCart(cid, arrayCart) {
        try {
            const cart = await cartsModel.findById(cid);
            cart.products.push(arrayCart);
            const newCart = await cart.save();
            return newCart;
        } catch {
            CustomError.createCustomError({
                name: ErrorsName.updateCartError,
                message: ErrorsMessage.updateCartError,
                cause: ErrorsCause.updateCartError,
            })
        }
    }

    async reduceStock(pid) {
        try {
            const updPrd = productsModel.updateOne(
                {_id: pid},
                {$inc: {"stock": -1}}
            )
            return updPrd;
        } catch (error) {
            logger.error(error)
        }
    }

    async incStock(pid) {
        try {
            const updPrd = productsModel.updateOne(
                {_id: pid},
                {$inc: {"stock": 1}}
            )
            return updPrd;
        } catch (error) {
            logger.error(error)
        }
    }

    async endPurchase(email, total) {
        try {
            let obj = {
                code: randomCode(),
                purchase_datetime: new Date(),
                amount: total,
                purchaser: email,
            }
            const ticket = await ticketsModel.create(obj)
            return ticket;
        } catch (error) {
            logger.error(error)
        }
    }
}