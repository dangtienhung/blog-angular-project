import joi from 'joi';
const CommentValidate = joi.object({
  userId: joi.number().required(),
  postId: joi.number().required(),
  content: joi.string().required(),
});
