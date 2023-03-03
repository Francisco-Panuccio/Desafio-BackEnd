import { cartsModel } from "../models/carts.model.js";

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
                    const updQty = cartsModel.updateOne(
                        {"products.product": pid},
                        {$inc: {"products.$.quantity": 1}}
                    )
                    return updQty;
                } else {
                    const pushPrdc = cartsModel.updateOne(
                        { _id: cid },
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
            const idCart = await cartsModel.findById(cid);
            if(idCart) {
                const idPrdc =  idCart.products.findIndex((element) => element.product === pid);
                if(idPrdc !== -1) {
                    const CartToDelete = await cartsModel.deleteOne({product:pid});
                    return CartToDelete;
                }
            }
        } catch (error) {
            console.log("Producto de Carrito no encontrado", error)
        }
    }
}