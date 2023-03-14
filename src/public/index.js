const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn")
const users = document.getElementById("divUsers")

logoutBtn.addEventListener("click", async (res) => {
    location.href='/';
    const logOut = await fetch("api/users/logout");
})

users.innerHTML