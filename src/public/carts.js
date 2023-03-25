const socketClient = io();

const container = document.getElementById("container");
const listCart = document.getElementById("listCart");
let idCart;
let total = 0;

/* FALTA UN SOCKET ON PARA CONOCER ID */

fetch(`/api/carts`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data[0].products)
        idCart = data[0]._id;
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
            }
        }

        let div2 = document.createElement("div");
        div2.innerHTML = `
        <span class="total">Total: $${total.toLocaleString()}</span>
        <input type="button" class="buyBtn" value="Realizar Compra">`
        div2.className = "buy"
        container.appendChild(div2);
    }) 
