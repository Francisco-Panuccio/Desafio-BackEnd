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
import "./persistence/mongoDB/dbConfig.js";
import "./passport/passportStrategies.js";
import { getProductsService } from "./service/products.services.js";
import { addToCartService } from "./service/carts.services.js";
import config from "../env/config.js";

const app = express();
const PORT = config.port;
const MONGO_URL = config.mongoUrl;
const httpServer = app.listen(PORT, () => console.log(`Escuchando al puerto ${PORT}`));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));  //PONER LA SESSION ARRIBA DEL ROUTER
app.use(session({
    store: MongoStore.create({
        mongoUrl:MONGO_URL,
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
    const prdcs = await getProductsService()
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

    socket.on("addPrdc", async (cart, prdt) => {
        const prdcts = await addToCartService(cart, prdt)
    })
});