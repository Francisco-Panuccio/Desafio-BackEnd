const socketClient = io();

const headerRTP = document.getElementById("headerRTP");
const formSub = document.getElementById("form");
const list2Sub = document.getElementById("list2");
const titleSub = document.getElementById("title");
const descriptionSub = document.getElementById("description");
const codeSub = document.getElementById("code");
const priceSub = document.getElementById("price");
const statusSub = document.getElementById("status");
const stockSub = document.getElementById("stock");
const categorySub = document.getElementById("category");
const thumbnailSub = document.getElementById("thumbnail");

let rol;
let ownerPremiumEmail;
let idCart;

fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        rol = (data.userRole);
        ownerPremiumEmail = (data.userEmail);
        idCart = (data.userCart)

        setTimeout(() => {
            let div = document.createElement("div");
            div.innerHTML = `<button class="btn btn2" id="btnHomeRTP">Home</button>
            <button id="cartBtn" class="btnCart" onclick="location.href='/carts'"><img src="https://cdn-icons-png.flaticon.com/512/107/107831.png"></button>`
            headerRTP.appendChild(div);
    
            const btnHomeRTP = document.getElementById("btnHomeRTP");
    
            btnHomeRTP.onclick = () => {
                btnHomeRTP.disabled = true;
                if(rol === "Premium") {
                    location.href = "/indexPremium"
                } else {
                    location.href = "/indexAdmin"
                }
            }
        }, 200) 
});


formSub.onsubmit = (e) => {
    e.preventDefault()

    let newPrdc;
    if(rol === "Premium") {
        newPrdc = {
            title: titleSub.value,
            description : descriptionSub.value,
            code: codeSub.value,
            price: priceSub.value,
            status: statusSub.value,
            stock: stockSub.value,
            category: categorySub.value,
            thumbnail: thumbnailSub.value,
            owner: ownerPremiumEmail
        }
    } else {
        newPrdc = {
            title: titleSub.value,
            description : descriptionSub.value,
            code: codeSub.value,
            price: priceSub.value,
            status: statusSub.value,
            stock: stockSub.value,
            category: categorySub.value,
            thumbnail: thumbnailSub.value,
            owner: "Admin"
        }
    }

    const config = {
        method: "POST",
        body: JSON.stringify(newPrdc),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }

    fetch("api/products", config)
        .then(response => {
            if(response.ok) {
                console.log(response.json())
                location.href = "/realTimeProducts"
            }
            else {
                throw new Error(response.status)
            }})
        .catch(err => {
            console.log("Error", err)
        })
}

setTimeout(() => {
    fetch(`/api/products`)
    .then((resp) => resp.json())
    .then((data) => {
        if(rol === "Premium") {
            const newArrayPrdcts = data.filter(dt => dt.owner === ownerPremiumEmail)
            
            const listRender = data.map(elm => {
                return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
                <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
                <li class="liContainer description">${elm.description}</li>
                <li class="liContainer price">$${elm.price.toLocaleString()}</li>
                <li class="liContainer category">Categoría (${elm.category})</li>
                <li class="liContainer stock">Stock (${elm.stock})</li>
                <li class="liContainer status">Status: ${elm.status}</li>
                <li class="liContainer code">Code: ${elm.code}</li>
                <li class="liContainer owner">Owner: ${elm.owner}</li>
                <button class="buttonContainer" id="${elm._id}">Agregar Producto</button></ul>`
            }).join(" ")

            const newListRender = newArrayPrdcts.map(elm => {
                return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
                <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
                <li class="liContainer description">${elm.description}</li>
                <li class="liContainer price">$${elm.price.toLocaleString()}</li>
                <li class="liContainer category">Categoría (${elm.category})</li>
                <li class="liContainer stock">Stock (${elm.stock})</li>
                <li class="liContainer status">Status: ${elm.status}</li>
                <li class="liContainer code">Code: ${elm.code}</li>
                <li class="liContainer owner">Owner: ${elm.owner}</li>
                <div class="containerBtnUD"><button class="btnUpgd" id="update-${elm._id}">Actualizar</button><button class="btnDel" id="delete-${elm._id}">Eliminar</button></div></ul>`
            }).join(" ")
            list2Sub.innerHTML = (listRender + newListRender);
        } else {
            const listRender = data.map(elm => {
                return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
                <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
                <li class="liContainer description">${elm.description}</li>
                <li class="liContainer price">$${elm.price.toLocaleString()}</li>
                <li class="liContainer category">Categoría (${elm.category})</li>
                <li class="liContainer stock">Stock (${elm.stock})</li>
                <li class="liContainer status">Status: ${elm.status}</li>
                <li class="liContainer code">Code: ${elm.code}</li>
                <li class="liContainer owner">Owner: ${elm.owner}</li>
                <div class="containerBtnUD"><button class="btnUpgd" id="update-${elm._id}">Actualizar</button><button class="btnDel" id="delete-${elm._id}">Eliminar</button></div></ul>`
            }).join(" ")
            list2Sub.innerHTML = listRender;
        }
    
        const buttons = document.querySelectorAll(".buttonContainer");
        const btnUpgd = document.querySelectorAll(".btnUpgd");
        const btnDel = document.querySelectorAll(".btnDel");
        let valueI;
        let upgPrdc = {
            field: valueI,
        }

        for(const btn of buttons) {
            btn.onclick = () => {
                btn.disabled = true;
                socketClient.emit("addPrdc", idCart, btn.id)
                const objPrd = data.find(elm => elm._id === btn.id)
                if(objPrd.stock <= 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Fuera de Stock',
                        text: 'Lo sentimos, ¡pronto repondremos!',
                      })
                } else {
                    fetch(`/api/carts/stockDec/${btn.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        location.href = "/realTimeProducts"
                    })
                }
            }
        }

        for(const button of btnUpgd) {
            button.onclick = () => {
                const fetchID = (button.id).slice(7)
                Swal.fire({
                    title: 'Inserte un Campo con su Valor',
                    icon: "warning",
                    html: '<select id="swalInput1">' +
                    '<optgroup label="Campos">' +
                        '<option>title</option>' +
                        '<option>description</option>' +
                        '<option>code</option>' +
                        '<option>price</option>' +
                        '<option>status</option>' +
                        '<option>stock</option>' +
                        '<option>category</option>' +
                        '<option>thumbnail</option>' +
                    '</optgroup>' +
                    '</select>' +
                    '<input id="swalInput2" placeholder="Valor">',
                    showCancelButton: true,
                    preConfirm: () => {
                        return new Promise(function(resolve) {
                            resolve([
                                upgPrdc.field = document.getElementById("swalInput1").value,
                                upgPrdc.valueI = document.getElementById("swalInput2").value
                            ])
                        })  
                    }
                }) .then((result) => {
                    if(result.isConfirmed) {
                        if(upgPrdc.valueI) {
                            fetch(`/api/products/${fetchID}`, {
                                method: "PUT",
                                body: JSON.stringify(upgPrdc),
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            })
                                .then((resp) => resp.json())
                                .then((data) => {
                                    console.log("Actualizado", data)
                                    location.href = "/realTimeProducts"
                                })
                        }
                    }
                })
        }
    
        for(const button of btnDel) {
            button.onclick = () => {
                const fetchID = (button.id).slice(7)
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
                        fetch(`/api/products/${fetchID}`, {
                            method: "DELETE",
                        })
                            .then((resp) => resp.json())
                            .then((data) => {
                                location.href = "/realTimeProducts"
                            })
                    }
                })
            }
        }
    }})
}, 500)