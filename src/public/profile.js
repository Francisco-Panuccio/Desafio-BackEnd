const socketClient = io();

const divUser = document.getElementById("divContainer")
const btnProfile = document.getElementById("btnProfile")

fetch(`/api/users/current`)
    .then((resp) => resp.json())
    .then((data) => {
        if(data.userRole !== "Admin") {
            const div = document.createElement("div")
            div.className = "divUsers"
            div.innerHTML = `
            <p>Bienvenido: <span>${data.userName}</span></p>
            <p>Email: <span>${data.userEmail}</span></p>
            <p>Rol: <span>${data.userRole}</span></p>
            <p>Carrito: <span>${data.userCart}</span></p>`
            divUser.append(div)
        } else {
            const div = document.createElement("div")
            div.className = "divUsers"
            div.innerHTML = `
            <p>Bienvenido: <span>${data.userName}</span></p>
            <p>Email: <span>${data.userEmail}</span></p>
            <p>Rol: <span>${data.userRole}</span></p>`
            divUser.append(div)
        }

        btnProfile.addEventListener("click", () => {
            if(data.userName === "Admin") {
                location.href = "/indexAdmin"
            } else {
                location.href = "/index"
            }
        })
});