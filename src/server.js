import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js";
import mockingsRouter from "./routes/mockings.router.js";
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
import { addToCartService, endPurchaseService } from "./service/carts.services.js";
import config from "../env/config.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from "./swaggerSpecs.js";

const app = express();
const PORT = config.port;
const MONGO_URL = config.mongoUrl;
const httpServer = app.listen(PORT, () => console.log(`Escuchando al puerto ${PORT}`));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
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
app.use("/api/mockings", mockingsRouter);
app.use("/", viewsRouter);

app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

const infoMessage = [];

socketServer.on("connection", async (socket) => {
    console.log(`Cliente Conectado: ${socket.id}`)
    
    socket.on("disconnect", () => {
        console.log("Cliente Desconectado")
    })

    socket.on("userData", data => {
        socketServer.emit("data", data)
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
        const stockCart = await endPurchaseService(cart, prdt)
    })
});