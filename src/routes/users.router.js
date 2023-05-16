import { Router } from "express";
import passport from "passport";
import { createUserController, loginUserController, getUserByEmailController, logoutController, profileUserController, getMailController, changeRoleController, recoveryFormController} from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", createUserController)

router.post("/login", loginUserController)

router.get("/", getUserByEmailController)

router.get("/logout", logoutController)

router.get("/current", profileUserController)

router.get("/registerGithub", passport.authenticate("github", { scope: ["user:email"] }))

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.userName = req.user.first_name
    req.session.email = req.user.email
    req.session.userRole = req.user.role
    if(req.session.userRole === "Usuario") {
        res.redirect("/index")
    } else {
        res.redirect("/indexPremium")
    }
})

router.post("/recoveryPassword", getMailController)

router.post("/recoveryForm", recoveryFormController)

router.put("/premium/:uid", changeRoleController)

export default router;