import Joi from 'joi';

const tagValidate = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Please enter title',
    'any.required': 'Please enter title required',
  }),
});

export default tagValidate;
