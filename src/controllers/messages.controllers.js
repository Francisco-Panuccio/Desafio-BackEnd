import { addMessageService, getMessagesService } from "../service/messages.services.js";

export const addMessageController = async (req, res) => {
    const message = req.body;
    const generateMessage = await addMessageService(message);
    res.json(generateMessage);
}

export const getMessagesController = async (req, res) => {
    const messages = await getMessagesService();
    res.json(messages)
}