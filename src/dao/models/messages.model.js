import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    message: {
        type: String
    }
})

export const messagesModel = mongoose.model("Messages", messagesSchema)