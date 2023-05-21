import joi from 'joi';

export const CommentValidate = joi.object({
  userId: joi.string().required().messages({
    'any.required': 'User is required',
    'string.empty': 'User is not empty',
    'string.base': 'User must be a string',
    'string.min': 'User must be at least 3 characters',
  }),
  postId: joi.string().required().messages({
    'any.required': 'Post is required',
    'string.empty': 'User is not empty',
    'string.base': 'User must be a string',
    'string.min': 'User must be at least 3 characters',
  }),
  content: joi.string().required().messages({
    'any.required': 'Content is required',
    'string.empty': 'Content is not empty',
    'string.base': 'Content must be a string',
  }),
  likes: joi.number().default(0),
});
