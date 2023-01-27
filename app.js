import express from "express";
import dotenv from "dotenv";

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

export default app;
