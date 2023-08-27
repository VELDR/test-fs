const Joi = require('joi');

const createProductValidator = Joi.object({
  categoryId: Joi.number().required().empty('').messages({
    'any.required': 'Category ID is required.',
  }),
  categoryName: Joi.string().required().empty('').messages({
    'any.required': 'Category Name is required.',
  }),
  sku: Joi.string().length(6).required().empty('').messages({
    'string.length': 'SKU must be exactly {#limit} characters long.',
    'any.required': 'SKU is required.',
  }),
  name: Joi.string().required().empty('').messages({
    'any.required': 'Product Name is required.',
  }),
  description: Joi.string().max(200).required().empty('').messages({
    'string.max': 'Product Description cannot exceed {#limit} characters.',
    'any.required': 'Product Description is required.',
  }),
  weight: Joi.number().min(0).required().empty('').messages({
    'number.min': 'Weight cannot be negative.',
    'any.required': 'Weight is required.',
  }),
  width: Joi.number().min(0).required().empty('').messages({
    'number.min': 'Width cannot be negative.',
    'any.required': 'Width is required.',
  }),
  length: Joi.number().min(0).required().empty('').messages({
    'number.min': 'Length cannot be negative.',
    'any.required': 'Length is required.',
  }),
  height: Joi.number().min(0).required().empty('').messages({
    'number.min': 'Height cannot be negative.',
    'any.required': 'Height is required.',
  }),
  image: Joi.string().allow(''),
  harga: Joi.number().min(0).required().empty('').messages({
    'number.min': 'Price cannot be negative.',
    'any.required': 'Price is required.',
  }),
});

const productValidator = {
  createProductValidator,
};

module.exports = productValidator;
