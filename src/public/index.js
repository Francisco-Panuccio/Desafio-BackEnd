const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async (res) => {
    location.href='/';
    const logOut = await fetch("api/users/logout");
})