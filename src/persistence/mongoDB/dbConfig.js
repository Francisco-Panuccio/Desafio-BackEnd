import mongoose from "mongoose";
import config from "../../../env/config.js"

const URI = config.mongoUrl

mongoose.connect(URI, (error) => {
    if(error) {
        console.log("Error de Conexión a la Base de Datos")
    } else {
        console.log("Conectado a la Base de Datos con Éxito")
    }
})