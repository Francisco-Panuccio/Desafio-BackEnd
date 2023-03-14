const socketClient = io();

const listCart = document.getElementById("listCart");
socketClient.on("addNow", arrayPrdctCart => {
    const listRenderCart = arrayPrdctCart.map(elm => {
        return `<ul class="ulContainer"><li class="title liContainer">${elm.title}</li>
        <li class="liContainer imgContainer"><img src=${elm.thumbnail} class="img"></li>
        <li class="liContainer description">${elm.description}</li>
        <li class="liContainer price">$${elm.price.toLocaleString()}</li>
        <button class="buttonContainer" id="${elm._id}">Agregar Producto</button>
        <input type="text" value=1></input>
        <button class="buttonContainer" id="${elm._id}">Eliminar Producto</button></ul>`
    }).join(" ")
    listRenderCart.innerHTML = listCart;
})