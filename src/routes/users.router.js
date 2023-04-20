import { Router } from "express";
import passport from "passport";
import { createUserController, loginUserController, getUserByEmailController, logoutController} from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", createUserController)

router.post("/login", loginUserController)

router.get("/", getUserByEmailController)

router.get("/logout", logoutController)

/* router.get("/current", profileUserController) */

router.get("/registerGithub", passport.authenticate("github", { scope: ["user:email"] }))

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.userName = req.user.first_name
    req.session.email = req.user.email
    req.session.userRol = "Usuario"
    res.redirect("/index")
})

export default router;