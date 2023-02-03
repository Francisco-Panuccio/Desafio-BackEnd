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

    socketClient.emit("object", newPrdc)
}

socketClient.on("list2", arrayPrdct => {
    console.log(arrayPrdct)
    const listRender = arrayPrdct.map(elm => {
        return `<li>${elm.title}</li>`
    })
    list2Sub.innerHTML = listRender;
})