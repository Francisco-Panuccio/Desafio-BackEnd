const socketClient = io();

const logoutBtn = document.getElementById("logoutBtn");
const footerIndex = document.getElementById("footerIndex");
let uid;

document.addEventListener("DOMContentLoaded", () => {
    fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        uid = data.userID
    });

    setTimeout(() => {
        let div = document.createElement("div");
        div.innerHTML = `<button class="btnRole" id="btnRole">Premium/User</button>`
        footerIndex.appendChild(div);

        const btnRole = document.getElementById("btnRole");
        btnRole.onclick = () => {
            btnRole.disabled = true;
            fetch(`/api/users/premium/${uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Rol cambiado exitosamente',
                    confirmButtonText: 'Ok',
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    allowOutsideClick: false,
                  }).then((result) => {
                    if(result.isConfirmed) {
                        location.href = "/sessionExpired"
                    }
                  })
            })
        }
    },400)
})

logoutBtn.addEventListener("click", async () => {
    setTimeout(() => {
        location.href = "/"
    }, 500)
    const logOut = await fetch("api/users/logout");
})