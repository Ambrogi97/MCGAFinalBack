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
            message: "User created",
            user: { ...result._doc, password: undefined, __v: undefined },
          });
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Internal server error",
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
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
            expiresIn: "24h",
          });

          return res.status(200).json({
            message: "Auth successful",
            token,
            user: { ...user._doc, password: undefined, __v: undefined },
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    } else {
      res.status(401).json({
        message: "Auth failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({
        message: "User deleted",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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
        message: "User updated",
        user: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);
    if (user) {
      res.status(200).json({
        message: "User fetched",
        user: { ...user._doc, password: undefined, __v: undefined },
      });
    }

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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
