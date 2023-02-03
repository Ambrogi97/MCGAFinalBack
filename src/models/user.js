import mongoose from "mongoose";

/**
 * Modelo de usuario
 */
const User = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", User);
