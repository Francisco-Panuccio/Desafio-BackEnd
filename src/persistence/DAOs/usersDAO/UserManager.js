import { usersModel } from "../../mongoDB/models/users.model.js";
import { hashPassword, comparePasswords } from "../../../utils.js"
import { addCartService } from "../../../service/carts.services.js";
import config from "../../../../env/config.js";
import UsersDTO from "../../DTOs/users.dto.js";
import AdminDTO from "../../DTOs/admin.dto.js";
import nodemailer from 'nodemailer';
import logger from "../../../winston/winston.js";

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.googleEmail,
        pass: config.googlePassword
    }
})

export default class UserManager {
    async createUser(user) {
        const {email, password} = user;
        try {
            const userExists = await usersModel.find({email}); 
            if(userExists.length === 0) {
                const newCart = await addCartService()
                const hashNewPassword = await hashPassword(password)
                const newUser = {...user, password: hashNewPassword, cart: newCart._id}
                await usersModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            logger.error("Error en la creación del usuario", error)
        }
    }

    async loginUser(user) {
        const { email, password } = user;
        if(email === config.adminEmail && password === config.adminPassword) {
            const adminDTO = new AdminDTO(email)
            return adminDTO;
        } else {
            const userOne = await usersModel.findOne({ email });
            if(userOne) {
                const isPassword = await comparePasswords(password, userOne.password);
                if(isPassword) {
                    await usersModel.updateOne({email: userOne.email}, {last_connection: new Date()})
                    const userDTO = new UsersDTO(userOne)
                    return userDTO;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } 
    }

    async userList() {
        try {
            const users = await usersModel.find({})
            return users;
        } catch (error) {
            logger.error(error)
        }
    }

    async getUserByEmail(email) {
        try {
            if(email === config.adminEmail) {
                const adminDTO = new AdminDTO(email)
                return adminDTO;
            } else {
                const user = await usersModel.findOne({ email });
                const userDTO = new UsersDTO(user);
                return userDTO;
            }
        } catch (error) {
            logger.info("Id no encontrado", error)
        }
    }

    async getProfileUser(user) {
        const email = user;
        if(email === config.adminEmail) {
            const adminDTO = new AdminDTO(email)
            return adminDTO;
        } else {
            const userOne = await usersModel.findOne({ email });
            if(userOne) {
                const userDTO = new UsersDTO(userOne)
                return userDTO;
            } else {
                return null;
            }
        }
    }
    
    async getMail(userEmail) {
        try {
            const emailRecovery = await usersModel.findOne({userEmail});
            if(emailRecovery) {
                let result = await transport.sendMail({
                    from: "Sneakers <franciscopanuccio@gmail.com>",
                    to: emailRecovery.email,
                    subject: 'Reestablecer Contraseña',
                    html: `
                        <div>
                            <p>Para reestablecer tu contraseña ingresa en el siguiente link:</p>
                            <a href="http://localhost:8080/recoveryPassword">Click aquí</a>
                        </div>
                    `
                })
                return result;
            }
        } catch (error) {
            logger.error("Email de usuario no encontrado", error)
        }
    }
    
    async changeRole(uid) {
        try {
            const changeRol = await usersModel.findById(uid);
            if(changeRol.role === "Usuario") {
                const newRole = usersModel.updateOne(
                    {_id: uid},
                    {role: "Premium"}
                )
                return newRole;
            } else {
                const newRole = usersModel.updateOne(
                    {_id: uid},
                    {role: "Usuario"}
                )
                return newRole;
            }
        } catch (error) {
            logger.info(error)
        }
    }

    async recoveryForm(userData) {
        try {
            const {email, password} = userData;
            const emailFounded = await usersModel.find({email: email});
            const isPassword = await comparePasswords(password[0], emailFounded[0].password);
            console.log(isPassword)
            if(emailFounded[0] !== undefined && emailFounded[0].email === email) {
                if(password[0] === password[1]) {
                    if(!isPassword) {
                        const newHashPass = await hashPassword(password[0]);
                        const newUserPass = await usersModel.updateOne(
                            {email: email},
                            {password: newHashPass}
                        );
                        return (newUserPass, "Contraseña cambiada exitosamente");
                    } else {
                        return("No puedes reestablecer con la misma contraseña");
                    }
                } else {
                    return("Las contraseñas no coinciden");
                }
            } else {
                return("Usuario no encontrado");
            }
        } catch (err) {
            logger.error(err)
        }
    }

    async changeLastConnection(email) {
        try {
            const user = await usersModel.findOne({email})
            const newUpd = await usersModel.updateOne({email: user.email}, {last_connection: new Date()})
            return newUpd;
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteInactiveUsers() {
        try {
            const dateNow = new Date();
            const users = await usersModel.find({})
            for(const user of users) {
                if(dateNow.getDate() > (user.last_connection.getDate()+2)) {
                    let deleteAccount = await transport.sendMail({
                        from: "Sneakers <franciscopanuccio@gmail.com>",
                        to: user.email,
                        subject: 'Cuenta Eliminada',
                        html: `
                            <div>
                                <p>Le informamos que hemos eliminado su cuenta por inactividad.</p>
                            </div>
                        `
                    })
                    await usersModel.deleteOne({email: user.email})
                    return deleteAccount;
                }
            }
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteUser(uid) {
        try {
            const userDeleted = await usersModel.deleteOne({_id:uid});
            return userDeleted;
        } catch (error) {
            logger.error(error)
        }
    }
}