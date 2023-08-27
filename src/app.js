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
import SessionRoute from "./routes/sessions.router.js"
import loginRouter from "./routes/login.router.js"
import signupRouter from "./routes/signup.router.js"
import ForgotRoute from "./routes/forgot.router.js"
//passport
import passport from "passport";
import initializePassport from "./dao/config/passport.config.js";
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();
app.use(cookieParser("P1r4t3S3cr3t"));

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const environment = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

environment();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/cart/", cartProductRouter);
app.use("/", loginRouter);
app.use("/signup", signupRouter);
app.use("/forgot", ForgotRoute);
app.use("/api/sessions/", SessionRoute);

const server = app.listen(PORT, () => {
  console.log(`servidor escuchando desde el puerto ${PORT}!`);
});

server.on("error", (err) => {
  console.error(err);
});