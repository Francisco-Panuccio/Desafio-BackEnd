import mongoose from "mongoose";
import randomCode from "../../../public/functions/randomCode.js"

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: randomCode()
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

export const ticketsModel = mongoose.model("Tickets", ticketsSchema)