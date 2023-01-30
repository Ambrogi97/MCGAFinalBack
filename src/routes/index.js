import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./products.js";

// configuracion de dotenv
dotenv.config();

// conexion con la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(err => {
    console.log("Error al conectar a la base de datos", err);
  });

// creacion del servidor
const app = express();

// body parser
app.use(express.json());

// Rutas
app.use("/products", productRoutes);

// Ping prueba de estado
app.get("/ping", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: "ok" });
  } else {
    res.status(500).json({ message: "error" });
  }
});

export default app;
