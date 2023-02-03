import express from "express";

import userController from "../controllers/user.js";

const router = express.Router();

// signup
router.post("/", userController.signup);

// login
router.post("/login", userController.login);

// obtener todos los productos
router.get("/", userController.getUsers);

// obtener un producto por id
router.get("/:id", userController.getUserById);

// eliminar un producto por id
router.delete("/:id", userController.deleteUser);

// actualizar un producto por id
router.put("/:id", userController.updateUser);

export default router;
