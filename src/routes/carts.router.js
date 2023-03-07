import { Router } from "express";
import CartManager from "../dao/mongoManagers/CartManager.js";
import ProductManager from "../dao/mongoManagers/ProductManager.js"

const router = Router();
export const cartManager = new CartManager("../carts.json");
const productManager = new ProductManager("../products.json");

router.post("/", async(req,res) => {
    const cart = req.body;
    const generateCart = await cartManager.addCart(cart);
    res.json(generateCart);
})

router.get("/", async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json(carts)
})

router.get("/:cid", async(req,res) => {
    const {cid} = req.params;
    const idCart = await cartManager.getCartById(cid);
    if(!idCart) {
        res.json({message:"ID no encontrada"})
    } else {res.json(idCart)}
})

router.post("/:cid/products/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const allIds = await productManager.getProducts()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const response = await cartManager.addToCart(cid, pid);
        res.json(response);
    } else {res.json({message:"Id no encontrada"})}
})

router.delete("/:cid/products/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const allIds = await productManager.getProducts()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const delOnePrdc = await cartManager.deletePrdcCart(cid, pid)
        res.json({message:"Producto eliminado exitosamente", delOnePrdc});
    } else {
        res.json({message:"Id no encontrada"});
    }
})

router.delete("/:cid", async(req,res) => {
    const {cid} = req.params;
    const delPrdcs = await cartManager.deleteAllPrdcts(cid);
    res.json({message:"Productos eliminados exitosamente", delPrdcs});
})

router.put("/:cid/products/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const objValue = req.body;
    const allIds = await productManager.getProducts()
    const prdtId = allIds.find(elm => elm.id === pid)
    if(prdtId) {
        const qnt = Object.values(objValue)
        const updOnePrdc = await cartManager.updatePrdctCart(cid, pid, ...qnt);
        res.json({message:"Producto actualizado exitosamente", updOnePrdc});
    } else {
        res.json({message:"Id no encontrada"});
    }
})

router.put("/:cid", async(req,res) => {
    const {cid} = req.params;
    const objValue = req.body;
    const updCart = await cartManager.updateCart(cid, objValue);
    res.json({message:"Productos agregados exitosamente", updCart});
})

export default router;