import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
    role: {
        type: String,
        default: "Usuario"
    },
    last_connection: {
        type: Date,
        default: new Date()
    }
});

usersSchema.pre("find", function(next) {
    this.populate("cart")
    next()
})

export const usersModel = mongoose.model("Users", usersSchema)