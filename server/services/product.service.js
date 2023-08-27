const mongoose = require('mongoose');
const ProductModel = require('../models/product.model');
const { createProductValidator } = require('../validators/product.validator');

const getAllProducts = async () => {
  const products = await ProductModel.find().sort({ createdAt: -1 });
  return products;
};

const getProductsByPage = async (pageNumber, pageSize, name = '') => {
  const skip = (pageNumber - 1) * pageSize;
  const query = {};

  // Add a name filter if a search query is provided
  if (name) {
    query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
  }
  const products = await ProductModel.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(skip)
    .exec();

  const totalItems = await ProductModel.countDocuments(query);

  return { products, totalItems };
};

const getProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const product = await ProductModel.findById(id);
  return product;
};

const createProduct = async (productData) => {
  const { error, value } = createProductValidator.validate(productData);
  if (error) {
    throw Error(error.details[0].message);
  }

  const newProduct = await ProductModel.create(value);
  return newProduct;
};

const updateProductById = async (id, productData) => {
  try {
    const { error, value } = createProductValidator.validate(productData, {
      stripUnknown: true,
    });
    if (error) {
      throw Error(error.details[0].message);
    }
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      { ...value },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProductById = async (id) => {
  const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });
  return deletedProduct;
};

const productService = {
  getAllProducts,
  getProductsByPage,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};

module.exports = productService;
