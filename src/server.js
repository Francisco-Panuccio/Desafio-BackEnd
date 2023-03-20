import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import "./dao/dbConfig.js";
import "./passport/passportStrategies.js";
import { productManager } from "./routes/products.router.js";
import { cartManager } from "./routes/carts.router.js";

const app = express();
const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log(`Escuchando al puerto ${PORT}`));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));  //PONER LA SESSION ARRIBA DEL ROUTER
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://FranciscoP:Computadora@coderclouster.jnpoa1s.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true}
    }),
    secret: "sessionKey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const arrayPrdct = [];
const infoMessage = [];

socketServer.on("connection", async (socket) => {
    console.log(`Cliente Conectado: ${socket.id}`)
    const prdcs = await productManager.getProducts()
    socketServer.emit("list", prdcs)
    
    socket.on("disconnect", () => {
        console.log("Cliente Desconectado")
    })

    socket.on("userData", data => {
        console.log(data)
        socketServer.emit("data", data)
    })

    socket.on("object", newPrdc => {
        arrayPrdct.push(newPrdc)
        socketServer.emit("list2", arrayPrdct)
    })

    socket.on("newUser", user => {
        socket.emit("active", user)
    })

    socket.on("message", info => {
        infoMessage.push(info)
        socketServer.emit("chat", infoMessage)
    })

    socket.on("addCart", async (allIds) => {
        console.log(allIds)
        if(allIds === null) {
            const addC = await cartManager.addCart()
            socketServer.emit("cart", addC.id)
        } else {
            socketServer.emit("cartCreated", allIds)
        }
    })

    socket.on("addPrdc", async (cart, button) => {
        const prdcts = await cartManager.addToCart(cart, button)
    })
});