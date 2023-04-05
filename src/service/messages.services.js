import { addMessage, getMessages } from "../persistence/persistence.js";

export async function addMessageService(obj) {
    const message = await addMessage(obj);
    return message;
}

export async function getMessagesService() {
    const messages = await getMessages();
    return messages;
}