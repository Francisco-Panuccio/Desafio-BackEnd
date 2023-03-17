const socketClient = io();

const listCart = document.getElementById("listCart");
let allIdsCarts;

fetch(`/api/carts/${allIdsCarts}`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
    }) 