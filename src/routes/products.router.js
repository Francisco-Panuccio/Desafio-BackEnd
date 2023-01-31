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
    res.json(idPrdct);
})

router.post("/", async(req,res) => {
    const prdc = req.body;
    const generatePrdc = await productManager.addProduct(prdc);
    res.json(generatePrdc)
})

router.put("/:pid", async(req,res) => {
    const {pid} = req.params;
    const objValue = req.body;
    const field = Object.keys(objValue)
    const value = Object.values(objValue)
    const updatePrdc = await productManager.updateProduct(parseInt(pid), ...field, ...value);
    res.json(updatePrdc);
})

router.delete("/:pid", async(req,res) => {
    const {pid} = req.params;
    const deletePrdc = await productManager.deleteProduct(parseInt(pid));
    res.json(deletePrdc);
})

export default router;