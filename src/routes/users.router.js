import { Router } from "express";
import UserManager from "../dao/mongoManagers/UserManager.js";

const router = Router();
const userManager = new UserManager();

router.get("/logout", (req,res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log(error)
        } else {
            console.log("Sesión Eliminada con Éxito")
            res.redirect("/")
        }
    })
})

router.post("/register", async (req,res) => {
    const user = req.body;
    const newUser = await userManager.createUser(user);
    if(newUser) {
        res.redirect("/")
    } else {
        res.redirect("/registerFail")
    }
})

router.post("/login", async (req,res) => {
    const { email, password } = req.body;
    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.email = email
        req.session.password = password
        res.redirect("/indexAdmin")
    } else {
        const user = await userManager.loginUser(req.body);
        if(user) {
            req.session.email = email
            req.session.password = password
            res.redirect("/index")
        } else {
            res.redirect("/loginFail")
        }
    }
})

export default router;