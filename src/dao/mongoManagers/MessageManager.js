import { messagesModel } from "../models/messages.model.js";

const MessageManager = {
    async addMessage(obj) {
        try {
            const newMsg = await messagesModel.create(obj);
            return newMsg;
        } catch (error) {
            console.log("Error al agregar el mensaje:", error)
        }
    },

    async getMessages() {
        try {
            const messages = await messagesModel.find({});
            return messages;
        } catch (error) {
            console.log("No se encuentran mensajes en la Base de Datos", error)
        }
    } 
}

export default MessageManager;