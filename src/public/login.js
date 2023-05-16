const btnMailing = document.getElementById("btnMailing");

btnMailing.onclick = async ()  => {
    const { value: email } = await Swal.fire({
        title: 'Correo Electrónico',
        input: 'email',
        inputLabel: 'Ingrese el correo electrónico asociado a su cuenta',
        inputPlaceholder: '...',
        confirmButtonText: 'Enviar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCancelButton: true,
      })
      
      if (email) {
        let emailRecovery = {email};

        const config = {
            method: "POST",
            body: JSON.stringify(emailRecovery),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }

        fetch('/api/users/recoveryPassword', config)
        .then((resp) => resp.json())
        .then((data) => {console.log(data)})
        .catch(err => {
            console.log("Error", err)
        })

        Swal.fire({
            title: 'Correo de Recuperación enviado',
            icon: 'success'
        })
      }
}