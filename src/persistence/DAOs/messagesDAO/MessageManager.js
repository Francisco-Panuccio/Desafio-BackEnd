import { messagesModel } from "../../mongoDB/models/messages.model.js";
import logger from "../../../winston/winston.js";

export default class MessageManager {
    async addMessage(obj) {
        try {
            const newMsg = await messagesModel.create(obj);
            return newMsg;
        } catch (error) {
            logger.error("Error al agregar el mensaje:", error)
        }
    }

    async getMessages() {
        try {
            const messages = await messagesModel.find({});
            return messages;
        } catch (error) {
            logger.warning("No se encuentran mensajes en la Base de Datos", error)
        }
    } 
}