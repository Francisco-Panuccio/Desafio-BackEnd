import { Router } from "express";
import { getMockingProductsController, generateMockingProductsController } from "../controllers/mockings.controllers.js";

const router = Router();

router.get("/mockingproducts", getMockingProductsController)

router.post("/mockingproducts", generateMockingProductsController)

export default router;