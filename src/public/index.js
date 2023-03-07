const socketClient = io();

const prdts = document.getElementById("prdts");

prdts.onclick = () => {
    socketClient.emit("addCart")
}