import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
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

export default router;