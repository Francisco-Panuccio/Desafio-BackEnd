import { Router } from "express";
import { addMessageController, getMessagesController } from "../controllers/messages.controllers.js";

const router = Router();

router.post("/", addMessageController)

router.get("/", getMessagesController)

export default router;