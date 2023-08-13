import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import cartProductRouter from "./routes/cartProduct.router.js";
import * as dotenv from "dotenv";

dotenv.config();

// Variables de entorno
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando peticiones desde el puerto ${PORT}`);
});
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
const connection = mongoose.connect(MONGO_URI);

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
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/cart/", cartProductRouter);

