const socketClient = io();

const container = document.getElementById("container");
const listCart = document.getElementById("listCart");
let idCart;
let total = 0;

fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        idCart = (data.cart)
    });

setTimeout(() => {
    fetch(`/api/carts/${idCart}`)
    .then((resp) => resp.json())
    .then((data) => {
        for(const prd of data[0].products) {
            const totalAmount = ((prd.product.price)*(prd.quantity));
            total = total + totalAmount
            let div = document.createElement("div");
            div.innerHTML = `
            <img src="${prd.product.thumbnail}" class="imgCart">
            <p class="titleCart">${prd.product.title}</p>
            <span class="priceCart">$${prd.product.price.toLocaleString()}</span>
            <span class="qntCart">${prd.quantity}</span>
            <button class="deletePrdcCart" id="${prd.product._id}"></button>`
            listCart.appendChild(div);
        }

        const buttons = document.querySelectorAll(".deletePrdcCart");

        for(const button of buttons) {
            button.onclick = () => {
                console.log("ELIMINANDO")
                fetch(`/api/carts/${idCart}/products/${button.id}`, {
                    method: "DELETE",
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                    location.href = "/carts"
                    })
            }
        }

        if(data[0].products.length !== 0) {
            let div2 = document.createElement("div");
            div2.innerHTML = `
            <span class="total">Total: $${total.toLocaleString()}</span>
            <input type="button" class="buyBtn" value="Realizar Compra">`
            div2.className = "buy"
            container.appendChild(div2);
        }
    })
}, 1000)
