import express from "express";

import auth from "../middlewares/auth.js";
import { loginValidator, signupValidator } from "../middlewares/validator.js";

import userController from "../controllers/user.js";

const router = express.Router();

// signup
router.post("/", signupValidator, userController.signup);

// login
router.post("/login", loginValidator, userController.login);

// obtener todos los usuarios
router.get("/", auth, userController.getUsers);

// obtener un usuario por id
router.get("/:id", auth, userController.getUserById);

// obtener el usuario logueado
router.post("/me", auth, userController.getMe);

// eliminar un usuario por id
router.delete("/:id", auth, userController.deleteUser);

// actualizar un usuario por id
router.put("/:id", auth, userController.updateUser);

export default router;
