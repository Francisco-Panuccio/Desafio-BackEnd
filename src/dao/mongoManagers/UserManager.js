import { usersModel } from "../models/users.model.js";
import { hashPassword, comparePasswords } from "../../utils.js"
import { cartManager } from "../../routes/carts.router.js";

export default class UserManager {
    async createUser(user) {
        const {email, password} = user;
        try {
            const userExists = await usersModel.find({email}); 
            if(userExists.length === 0) {
                const newCart = await cartManager.addCart()
                const hashNewPassword = await hashPassword(password)
                const newUser = {...user, password: hashNewPassword, cart: newCart._id}
                await usersModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error en la creación del usuario", error)
        }
    }

    async loginUser(user) {
        const { email, password } = user;
        if(email === "adminCoder@coder.com" && password ==="adminCod3r123") {
            const newUserAd = {
                userName: "Admin",
                userEmail: email,
                userPassword: password,
                userRol: "Admin"
            }
            return newUserAd;
        } else {
            const userOne = await usersModel.findOne({ email });
            if(userOne) {
                const isPassword = comparePasswords(password, userOne.password);
                if(isPassword) {
                    const newUserUs = {
                        userName: userOne.first_name,
                        userEmail: userOne.email,
                        userPassword: userOne.password,
                        userRol: userOne.role,
                        userCart: userOne.cart
                    }
                    return newUserUs;
                } else {
                    return null
                }
            } else {
                return null;
            }
        } 
    }

    async getUserByEmail(email) {
        try {
            const users = await usersModel.findOne({ email });
            return users;
        } catch (error) {
            console.log("Id no encontrado", error)
        }
    }
}