import { usersModel } from "../models/users.model.js";

export default class UserManager {
    async createUser(user) {
        const {email} = user;
        try {
            const userExists = await usersModel.find({email}); 
            if(userExists.length === 0) {
                const newUser = await usersModel.create(user);
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
            const userOne = await usersModel.findOne({ email, password });
            if(userOne) {
                const newUserUs = {
                    userName: userOne.first_name,
                    userEmail: userOne.email,
                    userPassword: userOne.password,
                    userRol: "Usuario"
                }
                return newUserUs;
            } else {
                return null;
            }
        } 
    }
}