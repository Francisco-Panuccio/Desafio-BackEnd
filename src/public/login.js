import { response } from "express";

const socketClient = io();

const formLogin = document.getElementById("formLogin");

/* formLogin.onsubmit = async (e) => {
    e.preventDefault()

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }

    fetch("/api/users/login", config)
        .then((resp) => resp.json())
        .then((data) => {
            
        })
        .catch(err => {
            console.log("Error", err)
        })
} */