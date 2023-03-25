const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async () => {
    setTimeout(() => {
        location.href = "/"
    }, 500)
    const logOut = await fetch("api/users/logout");
})