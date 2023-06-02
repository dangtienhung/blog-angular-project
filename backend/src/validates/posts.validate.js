import joi from 'joi';

export const postValidate = joi.object({
  title: joi.string().required().trim().min(3).messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is not allowed to be empty',
    'string.min': 'Title should have a minimum length of {#limit}',
    'any.required': 'Title is required',
  }),
  author: joi.string().required().messages({
    'string.base': 'User Id must be a string',
    'string.empty': 'User Id is not allowed to be empty',
    'any.required': 'User Id is required',
  }),
  content: joi.string().required().trim().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is not allowed to be empty',
    'any.required': 'Content is required',
  }),
  images: joi.array().messages({
    'string.base': 'Images must be a string',
    'string.empty': 'Images is not allowed to be empty',
    'any.required': 'Images is required',
  }),
  likes: joi.number().default(0),
  category: joi.string().required().messages({
    'string.base': 'Category must be a string',
    'string.empty': 'Category is not allowed to be empty',
    'any.required': 'Category is required',
  }),
  comments: joi.array().items(joi.string()),
  is_active: joi.boolean().default(true),
  status: joi.string().valid('pending', 'approved', 'rejected').default('pendding'),
  tags: joi.array().items(joi.string()),
  deleted: joi.boolean().default(false),
});
