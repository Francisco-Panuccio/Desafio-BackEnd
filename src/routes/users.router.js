import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongoManagers/UserManager.js";

const router = Router();
const userManager = new UserManager();

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
    const user = await userManager.loginUser(req.body);
    if(user) {
        req.session.email = email
        req.session.password = password
        req.session.userName = user.userName
        req.session.userRol = user.userRol
        req.session.userCart = user.userCart
        if(user.userRol === "Admin") {
            res.redirect("/indexAdmin")
        } else {
            res.redirect("/index")
        }
    } else {
        res.redirect("/loginFail")
    }
})

router.get("/logout", async (req,res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log(error)
            res.send({status: "Logout Error", body: error})
        } else {
            console.log("Sesión Eliminada con Éxito")
        }
    })
})

router.get("/registerGithub", passport.authenticate("github", { scope: ["user:email"] }))

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.userName = req.user.first_name
    req.session.userRol = "Usuario"
    res.redirect("/index")
})

export default router;