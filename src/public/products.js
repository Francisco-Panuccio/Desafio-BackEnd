const socketClient = io();

const listSub = document.getElementById("list");
let idCart;

fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        idCart = (data.userCart)
    });

setTimeout(() => {
    fetch(`/api/carts/${idCart}`)
        .then((resp) => resp.json())
}, 1200)

fetch(`/api/products`)
    .then((resp) => resp.json())
    .then((data) => {
        const listRender = data.map(elm => {
            return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
            <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
            <li class="liContainer description">${elm.description}</li>
            <li class="liContainer price">$${elm.price.toLocaleString()}</li>
            <li class="liContainer category">Categoría (${elm.category})</li> 
            <li class="liContainer stock">Stock (${elm.stock})</li>
            <button class="buttonContainer" id="${elm._id}">Agregar Producto</button></ul>`
        }).join(" ")
        listSub.innerHTML = listRender;
    
        const buttons = document.querySelectorAll(".buttonContainer");
    
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
                        location.href = "/products"
                    })
                }
            }
        }
    })