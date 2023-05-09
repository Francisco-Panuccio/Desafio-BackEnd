import { Router } from "express";
import { addProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController, aggregationFuncController, aggregationFunc2Controller, paginateController, logsWinstonController } from "../controllers/products.controllers.js";

const router = Router();

router.get("/", getProductsController)

router.get("/paginate", paginateController)

router.get("/aggregation/category/:category", aggregationFuncController)

router.get("/aggregation/stock/:stock", aggregationFunc2Controller)

router.get("/:pid", getProductByIdController)

router.get("/logs/loggerTest", logsWinstonController)

router.post("/", addProductController)

router.put("/:pid", updateProductController)

router.delete("/:pid", deleteProductController)

export default router;