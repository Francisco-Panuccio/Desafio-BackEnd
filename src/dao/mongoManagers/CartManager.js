import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

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
            const cartId = await cartsModel.findById(id);
            return cartId;
        } catch (error) {
            console.log("Id no encontrado", error)
        }
    } 

    async addToCart(cid, pid) {
        try {
            const idCart = await cartsModel.findById(cid);
            if(idCart) {
                const idPrdc =  idCart.products.findIndex((element) => element.product === pid);
                if(idPrdc !== -1) {
/*                     const updQty = cartsModel.updateOne(
                        { _id: cid },
                        { $inc: {"products": {quantity: 1}}}
                    )
                    return updQty; */
                    /* CORREGIR PARA PODER ACTUALIZAR LA CANTIDAD */
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
}