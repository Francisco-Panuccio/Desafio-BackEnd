const socketClient = io();

const listSub = document.getElementById("list");
let idCart;

fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        idCart = (data.cart)
    });

setTimeout(() => {
    fetch(`/api/carts/${idCart}`)
        .then((resp) => resp.json())
}, 1000)

socketClient.on("list", arrayPrdct => {    
    const listRender = arrayPrdct.map(elm => {
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

    for(const button of buttons) {
        button.onclick = () => {
            socketClient.emit("addPrdc", idCart, button.id)
        }
    }
})