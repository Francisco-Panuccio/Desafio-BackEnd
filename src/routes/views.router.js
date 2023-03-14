import { Router } from "express";
import { userValidation } from "../public/userValidation.js"
/* import { userValidationAdmin } from "../public/userValidationAdmin.js" */

const router = Router();

router.get("/index", userValidation, (req, res) => {
    res.render("index", {
        style: "index.css"
    })
})

router.get("/indexAdmin", (req, res) => {
    res.render("indexAdmin", {
        style: "index.css"
    })
})

router.get("/products", userValidation, (req, res) => {
    res.render("products", {
        style: "products.css"
    })
})

router.get("/carts", userValidation, (req, res) => {
    res.render("carts", {
        style: "index.css"
    })
})

router.get("/realTimeProducts", userValidation, (req, res) => {
    res.render("realTimeProducts", {
        style: "realTimeProducts.css"
    })
})

router.get("/chat", userValidation, (req, res) => {
    res.render("chat", {
        style: "chat.css"
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        style: "register.css"
    })
})

router.get("/registerFail", (req, res) => {
    res.render("registerFail", {
        style: "register.css"
    })
})

router.get("/", (req, res) => {
    res.render("login", {
        style: "login.css"
    })
})

router.get("/loginFail", (req, res) => {
    res.render("loginFail", {
        style: "login.css"
    })
})

router.get("/sessionExpired", (req, res) => {
    res.render("sessionExpired", {
        style: "sessionExpired.css"
    })
})

export default router;