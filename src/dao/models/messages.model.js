import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
})

export const messagesModel = mongoose.model("Messages", messagesSchema)