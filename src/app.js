import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
// managers
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import cartProductRouter from "./routes/cartProduct.router.js";
// dotenv
import * as dotenv from "dotenv";

import MongoStore from "connect-mongo";
import session from "express-session";
import sessionRouter from "./routes/sessions.router.js"
import loginRouter from "./routes/login.router.js"
import signupRouter from "./routes/signup.router.js"



dotenv.config();

// Variables de entorno
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando desde el puerto ${PORT}`);
});
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
const connection = mongoose.connect(MONGO_URI);
// conexion con la sesion de mongo
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 30,
    }),
    secret: "P1r4t3S3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);


function auth(req,res,next){
  if(req.session.rol){
      return next()
  }else{
      res.send("Error")
  }
}

connection
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });

//Template engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/cart/", cartProductRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/api/session/", sessionRouter);

