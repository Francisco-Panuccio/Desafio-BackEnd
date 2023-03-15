const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn")
const users = document.getElementById("divUsers")

logoutBtn.addEventListener("click", async (res) => {
    setTimeout(() => {
        location.href = "/"
    }, 500)
    const logOut = await fetch("api/users/logout");
})