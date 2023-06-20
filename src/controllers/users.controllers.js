import { createUserService, loginUserService, getUserByEmailService, getProfileUserService, getMailService, changeRoleService, recoveryFormService, changeLastConnectionService, deleteInactiveUsersService, userListService, deleteUserService } from "../service/users.services.js";

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
        req.session.userRole = user.userRole
        if(user.userRole === "Admin") {
            res.redirect("/indexAdmin")
        } 
        else if(user.userRole === "Premium") {
            res.redirect("/indexPremium")
        } else {
            res.redirect("/index")
        }
    } else {
        res.redirect("/loginFail")
    }
}

export const getUserByEmailController = async (req, res) => {
    const email = req.session.email;
    const users = await getUserByEmailService(email)
    res.json(users)
}

export const logoutController = async (req, res) => {
    const email = req.session.email;
    const lastConnection = await changeLastConnectionService(email);
    req.session.destroy((error) => {
        if(error) {
            console.log(error)
            res.send({status: "Logout Error", body: error})
        } else {
            res.send({message: "Sesión Eliminada con Éxito", lastConnection})
        }
    })
}

export const profileUserController = async (req, res) => {
    const email = req.session.email;
    const user = await getProfileUserService(email);
    res.json(user)
}

export const getMailController = async (req, res) => {
    const email = req.body;
    const mailing = await getMailService(email);
    res.send(mailing);
}

export const changeRoleController = async (req, res) => {
    const {uid} = req.params;
    const uidRole = await changeRoleService(uid);
    res.json(uidRole);
}

export const recoveryFormController = async (req, res) => {
    const {email, password} = req.body;
    const userFound = await recoveryFormService(req.body);
    res.send(userFound);
}

export const deleteInactiveUsersController = async (req, res) => {
    const users = await deleteInactiveUsersService();
    res.json(users)
}

export const userListController = async (req, res) => {
    const userList = await userListService();
    res.json(userList);
}

export const deleteUserController = async (req, res) => {
    const {uid} = req.params;
    const user = await deleteUserService(uid);
    res.json(user);
}
