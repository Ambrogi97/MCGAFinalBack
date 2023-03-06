import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ status: 'error', message: 'Este correo electronico ya esta registrado' });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      try {
        const user = new User({
          name,
          email,
          password: hash,
        });

        user.save().then((result) => {

          res.status(201).json({
            message: "usuario creado",
            user: { ...result._doc, password: undefined, __v: undefined },
          });
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "error interno del servidor",
        });
      }
    }
  });
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Autenticación fallida",
          });
        }
        if (result) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
            expiresIn: "24h",
          });

          return res.status(200).json({
            message: "Autenticación exitosa",
            token,
            user: { ...user._doc, password: undefined, __v: undefined },
          });
        }
        res.status(401).json({
          message: "Autenticación fallida",
        });
      });
    } else {
      res.status(401).json({
        message: "Autenticación fallida",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Usuarios obtenidos",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({
        message: "usuario eliminado",
      });
    } else {
      res.status(404).json({
        message: "usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();
      res.status(200).json({
        message: "Usuario actualizado",
        user: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);
    if (user) {
      res.status(200).json({
        message: "usuario obtenido",
        user: { ...user._doc, password: undefined, __v: undefined },
      });
    }

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error interno del servidor",
    });
  }
};

export default {
  signup,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
