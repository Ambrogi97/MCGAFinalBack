import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

// configuracion de dotenv
dotenv.config();

// signup route
const signup = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      try {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
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

// login route
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

// get all users route using mongoose
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

// get user by id route using mongoose
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

// delete user route with mongoose
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

// update user route with mongoose
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

// export routes
export default {
  signup,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
