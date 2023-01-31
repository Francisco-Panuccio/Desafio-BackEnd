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
    const generatePrdc = await productManager.addProduct(prdc);
    if(generatePrdc) {
        res.json({message:"Producto agregado correctamente", generatePrdc});
    } else {res.json({message:"Error"})}
})

router.put("/:pid", async(req,res) => {
    const {pid} = req.params;
    const {field, value} = req.body;
    const updatePrdc = await productManager.updateProduct(parseInt(pid), field, value);
    if(pid) {
        res.json(updatePrdc);
        res.json({message:"Archivo actualizado correctamente"});
    } else {
        res.json({message:"ID de producto no encontrado"});
    }
})

router.delete("/:pid", async(req,res) => {
    const {pid} = req.params;
    const deletePrdc = await productManager.deleteProduct(parseInt(pid));
    if(pid) {
        res.json(deletePrdc);
        res.json(`El archivo se ha eliminado correctamente`);
    } else {
        res.json({message:"ID de producto no encontrado"});
    }
})

export default router;