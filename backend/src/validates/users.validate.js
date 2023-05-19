import joi from 'joi';

export const userValidate = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  avatar: joi.string(),
  role: joi.string().valid('user', 'admin', 'superadmin'),
  is_active: joi.boolean(),
  deleted: joi.boolean(),
  postList: joi.array().items(joi.string()),
});
