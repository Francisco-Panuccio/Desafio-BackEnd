import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                default: []
            },
            quantity: {
                type: Number
            }
        }   
    ]
})

export const cartsModel = mongoose.model("Carts", cartsSchema)