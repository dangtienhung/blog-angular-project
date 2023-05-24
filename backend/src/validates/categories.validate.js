import Joi from 'joi';
import joi from 'joi';

const CatValidate = Joi.object({
  name: joi.string().required().messages({
    'string.empty': 'Please enter a name',
    'any.required': 'Please enter name required',
  }),
  slug: joi.string().messages({
    'string.empty': 'Please enter a slug',
    'any.required': 'Please enter slug required',
  }),
});

export default CatValidate;
