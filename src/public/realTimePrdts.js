const socketClient = io();

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

formSub.onsubmit = (e) => {
    e.preventDefault()

    let newPrdc = {
        title: titleSub.value,
        description : descriptionSub.value,
        code: codeSub.value,
        price: priceSub.value,
        status: statusSub.value,
        stock: stockSub.value,
        category: categorySub.value,
        thumbnail: thumbnailSub.value
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
                socketClient.emit("object", newPrdc)
                formSub.reset();
                location.href = "/realTimeProducts"
            }
            else {
                throw new Error(response.status)
}       })
        .catch(err => {
            console.log("Error", err)
        })
}

socketClient.on("list", arrayPrdct => {
    const listRender = arrayPrdct.map(elm => {
        return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
        <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
        <li class="liContainer description">${elm.description}</li>
        <li class="liContainer price">$${elm.price.toLocaleString()}</li>
        <li class="liContainer category">Categoría (${elm.category})</li>
        <li class="liContainer stock">Stock (${elm.stock})</li>
        <li class="liContainer status">Status: ${elm.status}</li>
        <li class="liContainer code">Code: ${elm.code}</li>
        <div class="containerBtnUD"><button class="btnUpgd" id="update-${elm._id}">Actualizar</button><button class="btnDel" id="delete-${elm._id}">Eliminar</button></div>`
    }).join(" ")
    list2Sub.innerHTML = listRender;

    const btnUpgd = document.querySelectorAll(".btnUpgd");
    const btnDel = document.querySelectorAll(".btnDel");
    const inputUpgd = document.getElementById("renderInput");

    for(const button of btnUpgd) {
        button.onclick = () => {
            const fetchID = (button.id).slice(7)
    }

    /*                     fetch(`/api/products/${fetchID}`, {
                        method: "PUT",
                        body: field, value
                    })
                        .then((resp) => resp.json())
                        .then((data) => {
                            console.log("Actualizado", data)
                            location.href = "/realTimeProducts"
                        }) */

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
                            console.log(data)
                            location.href = "/realTimeProducts"
                        })
                }
            })
        }
    }
})