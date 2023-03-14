const socketClient = io();

const userName = document.getElementById("username");
const formChat = document.getElementById("formChat");
const mailChat = document.getElementById("mail");
const messageChat = document.getElementById("message");
const chatParagraph = document.getElementById("chat");

let user = null;

if(!user) {
    Swal.fire({
        title: 'Bienvenido',
        text: 'Ingresa tu Nombre',
        input: 'text',
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas ingresar un nombre'
          }
        },
      }).then((username) => {
        user = username.value
        userName.innerText = user
        socketClient.emit('newUser', user)
      })
}

formChat.onsubmit = (e) => {
    e.preventDefault()

    let info = {
        name: mailChat.value,
        message: messageChat.value,
    }

    const config = {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
          "Content-Type": "application/json;charset=UTF-8"
      }
  }

  fetch("/api/messages", config)
      .then(response => {
          if(response.ok)
              console.log(response.json())
          else
              throw new Error(response.status)
      })
      .catch(err => {
          console.log("Error", err)
      })
      
    socketClient.emit("message", info)
    messageChat.value = ""
}

socketClient.on("chat", infoMessage => {
    const chatRender = infoMessage.map(elem => {
        return `<p><strong>${elem.name}: </strong>${elem.message}</p>`
    }).join(" ")
    chatParagraph.innerHTML = chatRender;
})

socketClient.on("active", user => {
    Toastify({
        text: `${user} ingresó al chat`,
        duration: 5000,
        position: 'right',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
    }).showToast();
})