import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./products.js";
import userRoutes from "./user.js";

// configuracion de dotenv
dotenv.config();

// conexion con la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });

// creacion del servidor
const app = express();

// cors para permitir peticiones desde el front end
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// body parser
app.use(express.json());

// Rutas
app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Ping prueba de estado
app.get("/api/ping", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: "ok" });
  } else {
    res.status(500).json({ message: "error" });
  }
});

export default app;
