const userList = document.getElementById("userList");

fetch(`/api/users/userList`)
    .then((resp) => resp.json())
    .then((data) => {
        for(const user of data) {
                const div = document.createElement("div")
                div.className = "divUserList"
                div.innerHTML = `<ul class="ulListUser"><li><span class="spanTitles">Nombre:</span>  ${user.first_name} ${user.last_name}</li>
                <li><span class="spanTitles">Email:</span> ${user.email}</li>
                <li><span class="spanTitles">Edad:</span> ${user.age}</li>
                <li><span class="spanTitles">Rol:</span> ${user.role}</li>
                <div class="divUserList2"><button class="btnUserRole" id="upd-${user._id}">User/Premium</button><button class="btnUserDel" id="del-${user._id}">Eliminar</button></div></ul>`
                userList.append(div)

                const btnUpgd = document.querySelectorAll(".btnUserRole");
                const btnDel = document.querySelectorAll(".btnUserDel");

                for(const btn of btnUpgd) {
                    btn.onclick = () => {
                        btn.disabled = true;
                        const fetchID = (btn.id).slice(4)
                        fetch(`/api/users/premium/${fetchID}`, {
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
                                    location.href = "/realTimeUsers"
                                }
                              })
                        })
                    }
                }

                for(const btn of btnDel) {
                    btn.onclick = () => {
                        const fetchID = (btn.id).slice(4)
                        Swal.fire({
                            title: '¿Deseas eliminar este producto?',
                            text: "No podrás revertir este cambio.",
                            showCancelButton: true,
                            icon: 'warning',
                            cancelButtonColor: '#d33',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Si'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                fetch(`/api/users/${fetchID}`, {
                                    method: "DELETE",
                                })
                                    .then((resp) => resp.json())
                                    .then((data) => {
                                        location.href = "/realTimeUsers"
                                    })
                            }
                        })
                    }
                }
            }
        }
    )