const socketClient = io();

const listCart = document.getElementById("listCart");
let idCart;

socketClient.on("cart", id => {
    idCart = id;
})

fetch(`/api/carts/${idCart}`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
    }) 