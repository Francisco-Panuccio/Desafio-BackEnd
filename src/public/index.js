const socketClient = io();

const listSub = document.getElementById("list");

socketClient.on("list", arrayPrdct => {
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
    listSub.innerHTML = listRender;
})