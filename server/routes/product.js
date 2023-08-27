const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  getProductsByPage,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const router = express.Router();

router.get('/all', getProducts);

router.get('/', getProductsByPage);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
