import express from "express";
import dotenv from "dotenv";
import productRoutes from "./src/routes/products.js";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(err => {
    console.log("Error al conectar a la base de datos", err);
  });

const app = express();

app.use(express.json());

// Ping prueba de estado
app.get("/api/ping", (req, res) => {
    if (mongoose.connection.readyState === 1) {
      res.json({ message: "ok" });
    } else {
      res.status(500).json({ message: "error" });
    }
  });
  

export default app;
