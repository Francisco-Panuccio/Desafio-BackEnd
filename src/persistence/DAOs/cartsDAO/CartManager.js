import { cartsModel } from "../../mongoDB/models/carts.model.js";
import { productsModel } from "../../mongoDB/models/products.model.js";
import { ticketsModel } from "../../mongoDB/models/tickets.model.js";
import randomCode from "../../../public/functions/randomCode.js"

export default class CartManager {
    async addCart(obj) {
        try {
            const newCart = await cartsModel.create(obj);
            return newCart;
        } catch (error) {
            console.log("Error al Agregar el Producto", error)
        }
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find({});
            return carts;
        } catch (error) {
            console.log("No hay productos en la Base de Datos", error)
        }
    } 

    async getCartById(id) {
        try {
            const cartId = await cartsModel.find({_id:id});
            return cartId;
        } catch (error) {
            console.log("Id no encontrado", error)
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
                        console.log("Cantidad aumentada")
                        return (updQty);
                    } else {
                        console.log("Stock Insuficiente")
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
        } catch (error) {
            console.log("Carrito no encontrado", error)
        }
    }

    async deletePrdcCart(cid, pid) {
        try {
            const cartPrdc = await cartsModel.findById(cid)
            const prdcIndex = cartPrdc.products.findIndex((element) => element.product == pid);
            cartPrdc.products.splice(prdcIndex,1);
            const newCart = await cartPrdc.save();
            return newCart;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllPrdcts(cid) {
        try {
            const cartPrdc = await cartsModel.findById(cid)
            cartPrdc.products.splice(0);
            const newCart = await cartPrdc.save();
            return newCart;
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(cid, arrayCart) {
        try {
            const cart = await cartsModel.findById(cid);
            cart.products.push(arrayCart);
            const newCart = await cart.save();
            return newCart;
        } catch (error) {
            console.log(error)
        }
    }

    async reduceStock(pid) {
        try {
            const updPrd = productsModel.updateOne(
                {_id: pid},
                {$inc: {"stock": -1}}
            )
            console.log("Stock disminuído")
            return updPrd;
        } catch (error) {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
        }
    }
}