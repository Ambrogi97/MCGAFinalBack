import Product from "../models/products.js";

// Crear product
const createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Producto creado",
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error al crear el producto",
      });
    });
};

// Obtener todos los productos
const getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error al obtener los productos",
      });
    });
};

// Obtener un producto por su id
const getOneProduct = (req, res) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
};

// Obtener un producto por su nombre
const getOneProductByName = (req, res) => {
  Product.findOne({ name: req.params.name }).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
};

// Borrar un producto
const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }).then(product => {
    if (product) {
      res.status(200).json({
        message: "Producto eliminado",
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
};

//Actualizar un producto
const updateProduct = (req, res) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });
  Product.updateOne({ _id: req.params.id }, product).then(product => {
    if (product) {
      res.status(200).json({
        message: "Producto actualizado",
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
};

export default {
  createProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getOneProductByName,
};
