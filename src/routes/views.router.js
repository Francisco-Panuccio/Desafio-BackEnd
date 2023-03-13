import { Router } from "express";

const router = Router();

router.get("/index", (req, res) => {
    res.render("index", {
        style: "index.css"
    })
})

router.get("/indexAdmin", (req, res) => {
    res.render("indexAdmin", {
        style: "index.css"
    })
})

router.get("/products", (req, res) => {
    res.render("products", {
        style: "index.css"
    })
})

router.get("/carts/:cid", (req, res) => {
    res.render("carts", {
        style: "index.css"
    })
})

router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts", {
        style: "index.css"
    })
})

router.get("/chat", (req, res) => {
    res.render("chat", {
        style: "index.css"
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        style: "index.css"
    })
})

router.get("/registerFail", (req, res) => {
    res.render("registerFail", {
        style: "index.css"
    })
})

router.get("/", (req, res) => {
    res.render("login", {
        style: "index.css"
    })
})

router.get("/loginFail", (req, res) => {
    res.render("loginFail", {
        style: "index.css"
    })
})

export default router;