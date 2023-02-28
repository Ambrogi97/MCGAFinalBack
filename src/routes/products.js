import express from "express";
import auth from "../middlewares/auth.js"

import productController from "../controllers/products.js";

const router = express.Router();

router.post("/", auth, productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getOneProduct);

router.get("/name/:name", productController.getOneProductByName);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", auth, productController.updateProduct);

export default router;
