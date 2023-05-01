import { createUserService, loginUserService, getUserByEmailService, getProfileUserService, getMailService } from "../service/users.services.js";

export const createUserController = async (req, res) => {
    const user = req.body;
    const newUser = await createUserService(user);
    if(newUser) {
        res.redirect("/")
    } else {
        res.redirect("/registerFail")
    }
}

export const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const user = await loginUserService(req.body);
    if(user) {
        req.session.email = email
        if(user.userRole === "Admin") {
            res.redirect("/indexAdmin")
        } else {
            res.redirect("/index")
        }
    } else {
        res.redirect("/loginFail")
    }
}

export const getUserByEmailController = async (req, res) => {
    console.log("Correo?")
    const email = req.session.email;
    const users = await getUserByEmailService(email)
    console.log("Correo enviado correctamente")
    res.json(users)
}

export const logoutController = async (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log(error)
            res.send({status: "Logout Error", body: error})
        } else {
            console.log("Sesión Eliminada con Éxito")
        }
    })
}

export const profileUserController = async (req, res) => {
    const email = req.session.email;
    const user = await getProfileUserService(email);
    res.json(user)
}

export const getMailController = async (req, res) => {
    const email = req.session.email;
    const mailing = await getMailService(email)
    res.send(mailing)
}