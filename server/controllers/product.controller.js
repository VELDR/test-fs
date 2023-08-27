const productService = require('../services/product.service');

const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

const getProductsByPage = async (req, res) => {
  const { pageNumber, pageSize, name } = req.query;
  const { products, totalItems } = await productService.getProductsByPage(
    pageNumber,
    pageSize,
    name
  );
  res.status(200).json({ products, totalItems });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProductById(id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.deleteProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductsByPage,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
