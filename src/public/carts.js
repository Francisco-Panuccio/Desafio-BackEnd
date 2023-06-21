const socketClient = io();

const container = document.getElementById("container");
const listCart = document.getElementById("listCart");
const headerHome = document.getElementById("headerHome");
let idCart;
let rol;
let total = 0;

fetch(`/api/users`)
    .then((resp) => resp.json())
    .then((data) => {
        idCart = (data.userCart)

        rol = (data.userRole)
    });

document.addEventListener("DOMContentLoaded", () => {
    let div = document.createElement("div");
    div.innerHTML = `<button class="btn btn2" id="btnHome">Home</button>
    <button class="btn btn2" id="btnPrdts">Atras</button>`
    headerHome.appendChild(div);

    const btnHome = document.getElementById("btnHome");
    const btnPrdts = document.getElementById("btnPrdts");

    btnHome.onclick = () => {
        btnHome.disabled = true;
        if(rol === "Premium") {
            location.href = "/indexPremium"
        }
        else if(rol === "Usuario") {
            location.href = "/index"
        } else {
            location.href = "/indexAdmin"
        }
    }

    btnPrdts.onclick = () => {
        btnPrdts.disabled = true;
        if(rol === "Usuario") {
            location.href = "/products"
        } else {
            location.href = "/realTimeProducts"
        }
    }
})

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
            <button class="deletePrdcCart" id="${prd.quantity}${prd.product._id}"></button>`
            listCart.appendChild(div);
        }

        const buttons = document.querySelectorAll(".deletePrdcCart");

        for(const button of buttons) {
            const fetchID = (button.id).slice(1)
            const fetchQnt = (button.id).slice(0,1)
            button.onclick = () => {
                button.disabled = true;
                fetch(`/api/carts/stockInc/${fetchID}/${fetchQnt}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
                    .then((resp) => resp.json())
                    .then((data) => {})

                fetch(`/api/carts/${idCart}/products/${fetchID}`, {
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
            <input type="button" class="buyBtn" id="endPurchase" value="Realizar Compra">`
            div2.className = "buy"
            container.appendChild(div2);
        }

        const btnPurchase = document.getElementById("endPurchase");

        let prdcPurchase = {
            total 
        }

        btnPurchase.onclick = () => {
            fetch(`/api/carts/${idCart}/purchase`, {
                method: "POST",
                body: JSON.stringify(prdcPurchase),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((resp) => console.log(resp.json()))

            fetch(`/api/carts/${idCart}`, {
                method: "DELETE",
            })
                .then((resp) => resp.json())
                .then((data) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra Realizada Exitosamente',
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.href = "/carts"
                        }
                      })
                })
        }
    })
}, 1000)