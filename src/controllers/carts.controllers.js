import { addCartService, getCartsService, getCartByIdService, addToCartService, deletePrdcCartService, deleteAllPrdctsService, updatePrdctCartService, updateCartService } from "../service/carts.services.js";
import { getProductsService } from "../service/products.services.js";

export const addCartController = async (req, res) => {
    const cart = req.body;
    const generateCart = await addCartService(cart);
    res.json(generateCart);
}

export const getCartsController = async (req, res) => {
    const carts = await getCartsService();
    res.json(carts)
}

export const getCartByIdController = async (req, res) => {
    const {cid} = req.params;
    const idCart = await getCartByIdService(cid);
    if(!idCart) {
        res.json({message:"ID no encontrada"})
    } else {res.json(idCart)}
}

export const addToCartController = async (req, res) => {
    const {cid, pid} = req.params;
    const allIds = await getProductsService()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const response = await addToCartService(cid, pid);
        res.json(response);
    } else {res.json({message:"Id no encontrada"})}
}

export const deletePrdcCartController = async (req, res) => {
    const {cid, pid} = req.params;
    const allIds = await getProductsService()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const delOnePrdc = await deletePrdcCartService(cid, pid)
        res.json({message:"Producto eliminado exitosamente", delOnePrdc});
    } else {
        res.json({message:"Id no encontrada"});
    }
}

export const deleteAllPrdctsController = async (req, res) => {
    const {cid} = req.params;
    const delPrdcs = await deleteAllPrdctsService(cid);
    res.json({message:"Productos eliminados exitosamente", delPrdcs});
}

export const updatePrdctCartController = async (req, res) => {
    const {cid, pid} = req.params;
    const objValue = req.body;
    const allIds = await getProductsService()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const qnt = Object.values(objValue)
        const updOnePrdc = await updatePrdctCartService(cid, pid, ...qnt);
        res.json({message:"Producto actualizado exitosamente", updOnePrdc});
    } else {
        res.json({message:"Id no encontrada"});
    }
}

export const updateCartController = async (req, res) => {
    const {cid} = req.params;
    const objValue = req.body;
    const updCart = await updateCartService(cid, objValue);
    res.json({message:"Productos agregados exitosamente", updCart});
}