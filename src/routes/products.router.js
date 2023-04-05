import { Router } from "express";
import { addProductController, getProductByController, updateProductController, deleteProductController, aggregationFuncController, aggregationFunc2Controller, paginateController } from "../controllers/products.controllers.js";

const router = Router();

router.get("/", paginateController)

router.get("/aggregation/category/:category", aggregationFuncController)

router.get("/aggregation/stock/:stock", aggregationFunc2Controller)

router.get("/:pid", getProductByController)

router.post("/", addProductController)

router.put("/:pid", updateProductController)

router.delete("/:pid", deleteProductController)

export default router;