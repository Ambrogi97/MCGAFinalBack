import express from "express";

import auth from "../middlewares/auth.js";
import { loginValidator, signupValidator } from "../middlewares/validator.js";

import userController from "../controllers/user.js";

const router = express.Router();

router.post("/", signupValidator, userController.signup);

router.post("/login", loginValidator, userController.login);

router.get("/", auth, userController.getUsers);

router.get("/:id", auth, userController.getUserById);

router.post("/me", auth, userController.getMe);

router.delete("/:id", auth, userController.deleteUser);

router.put("/:id", auth, userController.updateUser);

export default router;
