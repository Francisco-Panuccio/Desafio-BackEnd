import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import "./dao/dbConfig.js";
import { productManager } from "./routes/products.router.js";
import { cartManager } from "./routes/carts.router.js";

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

socketServer.on("connection", async (socket) => {
    console.log(`Cliente Conectado: ${socket.id}`)
    
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

    socket.on("addCart", async () => {
        const addC = await cartManager.addCart();
        socketServer.emit("cart", addC.id)
        const prdcs = await productManager.getProducts()
        socketServer.emit("list", prdcs)
    })

    socket.on("addPrdc", async (cart, button) => {
        console.log(cart, button)
        const addPrdc = await cartManager.addToCart(cart, button)
        socketServer.emit("addNow", addPrdc)
    })
});