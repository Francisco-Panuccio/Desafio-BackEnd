import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("Escuchando al puerto 8080"))
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

const arrayPrdct = [];

socketServer.on("connection", socket => {
    console.log(`Usuario Conectado: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log("Usuario Desconectado")
    })

    socket.on("object", newPrdc => {
        arrayPrdct.push(newPrdc)
        socketServer("list2", arrayPrdct)
    })
})