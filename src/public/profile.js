const divUser = document.getElementById("divContainer")
const btnProfile = document.getElementById("btnProfile")

fetch(`/api/users/current`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        if(data.userRole !== "Admin") {
            const div = document.createElement("div")
            div.className = "divUsers"
            div.innerHTML = `
            <p>Bienvenido: <span>${data.userName}</span></p>
            <p>Email: <span>${data.userEmail}</span></p>
            <p>Rol: <span>${data.userRole}</span></p>
            <p>Carrito: <span>${data.userCart}</span></p>`
            divUser.append(div);

            const divProfile = document.createElement("div")
            divProfile.className = "divFileProfile"
            divProfile.innerHTML = `
            <h1 class="profileTitle">Sube tu foto de perfil</h1>
            <form id="formFileProfile" action="/api/users/${data.userId}/documents/imageProfile" method="POST">
                Archivo: <input type="file" name="file[]" id="fileProfile" multiple required>
                <input id="fileProfileSubmit" type="submit" value="Enviar Datos">
            </form>`
            divUser.append(divProfile);

            const divProduct = document.createElement("div")
            divProduct.className = "divFileProduct"
            divProduct.innerHTML = `
            <h1 class="productTitle">Sube una foto de un producto</h1>
            <form id="formFileProduct" action="/api/users/${data.userId}/documents/imageProduct" method="POST">
                Archivo: <input type="file" name="file[]" id="fileProduct" multiple required>
                <input id="fileProductSubmit" type="submit" value="Enviar Datos">
            </form>`
            divUser.append(divProduct);

            const divDocument = document.createElement("div")
            divDocument.className = "divFile"
            divDocument.innerHTML = `
            <h1 class="fileTitle">Documento Pase Premium</h1>
            <form id="formFile" action="/api/users/${data.userId}/documents" method="POST">
                Identificación (Nombre Completo): <input type="text" id="fileID" required>
                Domicilio: <input type="text" id="fileDomicilio" required>
                Estado de Cuenta (Rol Actual): <input type="text" id="fileCuenta" required>
                <input id="fileSubmit" type="submit" value="Enviar Datos">
            </form>`
            divUser.append(divDocument);
        } else {
            const div = document.createElement("div")
            div.className = "divUsers"
            div.innerHTML = `
            <p>Bienvenido: <span>${data.userName}</span></p>
            <p>Email: <span>${data.userEmail}</span></p>
            <p>Rol: <span>${data.userRole}</span></p>`
            divUser.append(div)
        }

        btnProfile.addEventListener("click", () => {
            if(data.userName === "Admin") {
                location.href = "/indexAdmin"
            } else if(data.userRole === "Premium") {
                location.href = "/indexPremium"
            } else {
                location.href = "/index"
            }
        })
});