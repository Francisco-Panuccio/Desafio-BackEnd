import mongoose from "mongoose";
import config from "../env/config.js";

const URI = config.mongoUrl
mongoose
    .set("strictQuery", false)
    .connect(URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.log(error))