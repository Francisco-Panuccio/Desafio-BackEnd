import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("../products.json");

router.get("/", async(req,res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query;
    const limitedPrdcs = products.slice(0,limit);
    if(limit) {
        res.json({products:limitedPrdcs})
    } else {
        res.json(products);
    }
})

router.get("/:pid", async(req,res) => {
    const {pid} = req.params;
    const idPrdct = await productManager.getProductById(parseInt(pid));
    if(pid) {
        res.json(idPrdct);
    } else {
        res.json({message:"ID de producto no encontrado"});
    }
})

router.post("/", async(req,res) => {
    const prdc = req.body;
    const generatePrdc = await addProduct(prdc);
    res.json({message:"Producto agregado correctamente", generatePrdc});
})

router.put("/:pid", async(req,res) => {
    const {pid} = req.params;
    const value = req.body;
    const updatePrdc = await productManager.updateProduct(parseInt(pid), value);
    if(pid) {
        res.json(updatePrdc);
    } else {
        res.json({message:"ID de producto no encontrado"});
    }
})

router.delete("/:pid", async(req,res) => {
    const {pid} = req.params;
    const deletePrdc = await productManager.deleteProduct(parseInt(pid));
    if(pid) {
        res.json(deletePrdc);
    } else {
        res.json({message:"ID de producto no encontrado"});
    }
})

export default router;