const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async (res) => {
    setTimeout(() => {
        location.href = "/"
    }, 500)
    const logOut = await fetch("api/users/logout");
})