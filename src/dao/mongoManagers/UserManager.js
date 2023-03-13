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
        const userOne = await usersModel.findOne({ email, password });
        if(userOne) {
            return userOne;
        } else {
            return null;
        }
    }
}