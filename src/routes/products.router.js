import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";
import ProductManager from "../dao/mongoManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("../");

router.get("/", async(req,res) => {
    const {limit=10, page=1, sort, query} = req.query
    const products = await productsModel.paginate({query}, {limit, page, sort: {price: sort}})
    const status = products.docs ? "success" : "error";
    const prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
    const nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
    res.json({results:{
        status,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink
    }});
})

router.get("/aggregation/category", async(req,res) => {
    /* const sortId = req.params; */
    const categories = await productManager.aggregationFunc();
    res.json({categories});
})

router.get("/aggregation/stock/:sortId", async(req,res) => {
    const sortId = req.params;
    const stockAvble = await productManager.aggregationFunc2(parseInt(sortId));
    res.json({stockAvble});
})

router.get("/:pid", async(req,res) => {
    const {pid} = req.params;
    const idPrdct = await productManager.getProductById(pid);
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
    const updatePrdc = await productManager.updateProduct(pid, ...field, ...value);
    res.json(updatePrdc);
})

router.delete("/:pid", async(req,res) => {
    const {pid} = req.params;
    const deletePrdc = await productManager.deleteProduct(pid);
    res.json(deletePrdc);
})

export default router;