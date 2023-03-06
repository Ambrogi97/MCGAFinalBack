import express from "express";
import auth from "../middlewares/auth.js"

import productController from "../controllers/products.js";
import { productValidator } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", auth, productValidator, productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getOneProduct);

router.get("/name/:name", productController.getOneProductByName);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", auth, productValidator, productController.updateProduct);

export default router;
