import CommentValidate from '../validates/comment.validate.js';
import Post from '../models/posts.model.js';
import commentsModel from '../models/comments.model.js';

export const getComments = async (req, res) => {
  try {
    //get all comments
    const { page, limit = 10 } = req.query;
    const options = {
      page: page,
      limit: limit,
      sort: { createAt: -1 },
      populate: [
        { path: 'userId', select: '_id username' },
        { path: 'postId', select: '_id title' },
      ],
    };
    const comment = await commentsModel.paginate({}, options);
    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to find comments!" });
    }
    return res.status(200).send({ message: 'Success', data: comment });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', err: error });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params; //Fake post

    //get comment by id
    const comment = await commentsModel.findById(id);
    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to find comment!" });
    }
    return res.status(200).send({ message: 'Success', data: comment });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', err: error });
  }
};

export const sendComment = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log('🚀 ~ file: comment.controller.js:46 ~ sendComment ~ postId:', postId);
    const post = await Post.findById(postId);

    //Validate
    if (!post) {
      return res.status(404).send({ message: 'Fail', err: 'Some thing wrong' });
    }

    //send Comment && validate
    const { error } = CommentValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).send({ message: 'Fail', err: error.details.map((err) => err.message) });
    }
    const comment = await commentsModel.create(req.body);
    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to send comment!" });
    }

    // update Post
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { comments: comment._id },
    });
    return res.status(200).send({ message: 'Success', data: comment });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', err: error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    //delete Comment
    const comment = await commentsModel.findByIdAndRemove(id);
    console.log(comment);
    const post = await Post.findByIdAndUpdate(comment.postId, {
      $pull: { comments: id },
    });

    //Validate
    if (!post) {
      return res.status(404).send({ message: 'Fail', err: 'Some thing wrong' });
    }

    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to delete comment!" });
    }
    return res.status(200).send({ message: 'Success', data: comment });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', err: error });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    //update Comment
    const comment = await commentsModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to update comment!" });
    }
    return res.status(200).send({ message: 'Success', data: comment });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', err: error });
  }
};
