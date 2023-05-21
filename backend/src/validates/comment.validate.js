import joi from 'joi';
const CommentValidate = joi.object({
  userId: joi.string().required(),
  postId: joi.string().required(),
  content: joi.string().required().messages({
    'string.empty': 'Please enter a content',
    'any.required': 'Please enter content required',
  }),
});

export default CommentValidate;
