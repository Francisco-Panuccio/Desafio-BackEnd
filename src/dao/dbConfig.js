import mongoose from "mongoose";

const URI = "mongodb+srv://FranciscoP:Computadora@coderclouster.jnpoa1s.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI, (error) => {
    if(error) {
        console.log("Error de Conexión a la Base de Datos")
    } else {
        console.log("Conectado a la Base de Datos con Éxito")
    }
})