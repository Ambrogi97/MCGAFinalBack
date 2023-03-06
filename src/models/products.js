import mongoose from "mongoose";

const Product = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  image: { type: String }
});

export default mongoose.model("Product", Product);
