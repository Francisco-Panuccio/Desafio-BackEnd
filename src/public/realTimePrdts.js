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
    formSub.reset();
}

socketClient.on("list2", arrayPrdct => {
    const listRender = arrayPrdct.map(elm => {
        return `<ul><li><strong>Título:</strong> ${elm.title}</li>
        <li><strong>Descripción:</strong> ${elm.description}</li>
        <li><strong>Código:</strong> ${elm.code}</li>
        <li><strong>Precio:</strong> ${elm.price}</li>
        <li><strong>Estatus:</strong> ${elm.status}</li>
        <li><strong>Stock:</strong> ${elm.stock}</li>
        <li><strong>Categoría:</strong> ${elm.category}</li>
        <li><strong>Imágen:</strong> ${elm.thumbnail}</li></ul>`
    }).join(" ")
    list2Sub.innerHTML = listRender;
})