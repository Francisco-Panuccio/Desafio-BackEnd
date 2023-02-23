import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import "./dao/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log(`Escuchando al puerto ${PORT}`));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const arrayPrdct = [];
const infoMessage = [];

socketServer.on("connection", (socket) => {
    console.log(`Cliente Conectado: ${socket.id}`)
    socketServer.emit("list", arrayPrdct)

    socket.on("disconnect", () => {
        console.log("Cliente Desconectado")
    })

    socket.on("object", newPrdc => {
        arrayPrdct.push(newPrdc)
        socketServer.emit("list2", arrayPrdct)
    })

    socket.on("newUser", user => {
        socket.emit("active", user)
    })

    socket.on("message", info => {
        infoMessage.push(info);
        socketServer.emit("chat", infoMessage)
    })
});