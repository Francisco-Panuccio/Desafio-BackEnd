const socketClient = io();

const divUser = document.getElementById("divContainer")
const btnProfile = document.getElementById("btnProfile")

fetch(`/api/users/current`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        const div = document.createElement("div")
        div.className = "divUsers"
        div.innerHTML = `
        <p>Bienvenido: <span>${data.userName}</span></p>
        <p>Email: <span>${data.userEmail}</span></p>
        <p>Rol: <span>${data.userRole}</span></p>
        <p>Carrito: <span>${data.userCart}</span></p>`
        divUser.append(div)

        btnProfile.addEventListener("click", () => {
            if(data.userName === "Admin") {
                location.href = "/indexAdmin"
            } else {
                location.href = "/index"
            }
        })
});