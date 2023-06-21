import { Router } from "express";
import { addCartController, getCartsController, getCartByIdController, addToCartController, deletePrdcCartController, deleteAllPrdctsController, updatePrdctCartController, updateCartController, endPurchaseController, reduceStockController, incStockController } from "../controllers/carts.controllers.js";

const router = Router();

router.post("/", addCartController)

router.get("/", getCartsController)

router.get("/:cid", getCartByIdController)

router.post("/:cid/products/:pid", addToCartController)

router.delete("/:cid/products/:pid", deletePrdcCartController)

router.delete("/:cid", deleteAllPrdctsController)

router.put("/:cid/products/:pid", updatePrdctCartController)

router.put("/:cid", updateCartController)

router.put("/stockDec/:pid", reduceStockController)

router.put("/stockInc/:pid/:qnt", incStockController)

router.post("/:cid/purchase", endPurchaseController)

export default router;