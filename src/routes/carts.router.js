import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("../carts.json");

router.post("/", async(req,res) => {
    const cart = req.body;
    const generateCart = await cartManager.addCart(cart);
    if(generateCart) {
        res.json({message:"Carrito agregado correctamente", generateCart});
    } else {res.json({message:"Error"})}
})

router.get("/:cid", async(req,res) => {
    const {cid} = req.params;
    const idCart = await cartManager.getCartById(parseInt(cid));
    if(cid) {
        res.json(idCart);
    } else {
        res.json({message:"ID de carrito no encontrado"});
    }
})

router.post("/:cid/products/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const response = await cartManager.addToCart(cid, pid);
    if(response) {
        res.json({message:"Producto de carrito agregado correctamente", response});
    } else {res.json({message:"Error en carrito"})}
})

export default router;