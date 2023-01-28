import { Router } from "express";

const router = Router();
const cartManager = new CartManager("../carts.json");

router.post("/", async(req,res) => {
    const cart = req.body;
    const generateCart = await addCart(cart);
    res.json({message:"Carrito agregado correctamente", generateCart});
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
    const {cid} = req.params;
    const cart = req.body;
    
})

export default router;