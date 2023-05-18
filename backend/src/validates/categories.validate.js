import Joi from 'joi';
import joi from 'joi';
const CatValidate = Joi.object({
  name: joi.string().required().min(3),
  slug: joi.string().required(),
});

export default CatValidate;
