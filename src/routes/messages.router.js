import { Router } from "express";
import MessageManager from "../dao/mongoManagers/MessageManager.js";

const router = Router();

router.post("/", async(req,res) => {
    const message = req.body;
    const generateMessage = await MessageManager.addMessage(message);
    res.json(generateMessage);
})

router.get("/", async(req,res) => {
    const messages = await MessageManager.getMessages();
    res.json(messages)
})

export default router;