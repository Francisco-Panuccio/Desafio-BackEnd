import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    purchaser: {
        type: String,
        required: true
    }
})

export const ticketsModel = mongoose.model("Tickets", ticketsSchema)