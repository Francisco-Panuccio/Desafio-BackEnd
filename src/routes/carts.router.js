import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("../carts.json");

router.post("/", async(req,res) => {
    const cart = req.body;
    const generateCart = await cartManager.addCart(cart);
    res.json(generateCart);
})

router.get("/:cid", async(req,res) => {
    const {cid} = req.params;
    const idCart = await cartManager.getCartById(parseInt(cid));
    if(!idCart) {
        res.json({message:"ID no encontrada"})
    } else {res.json(idCart)}
})

router.post("/:cid/products/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const response = await cartManager.addToCart(parseInt(cid), parseInt(pid));
    res.json(response);
})

export default router;