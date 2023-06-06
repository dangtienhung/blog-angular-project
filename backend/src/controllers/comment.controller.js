import CommentValidate from '../validates/comment.validate.js';
import Post from '../models/posts.model.js';
import User from '../models/users.models.js';
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
        { path: 'postId', select: '_id title deleted' },
      ],
      // query: { deleted: true },
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

export const countCommentPost = async (req, res) => {
  try {
    console.log('Test');
    const data = await commentsModel.aggregate([
      {
        $group: {
          _id: '$postId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'Post',
          localField: '_id',
          foreignField: '_id',
          as: 'Post',
        },
      },
      {
        $unwind: {
          path: '$Post',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'Post.author',
          foreignField: '_id',
          // pipeline: [
          //   {
          //     $match: {
          //       'Post.deleted': false,
          //     },
          //   },
          // ],
          as: 'Author',
        },
      },
      {
        $unwind: {
          path: '$Author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          count: 1,
          _id: 0,
          Post: {
            _id: 1,
            title: 1,
            author: 1,
            content: 1,
            deleted: 1,
            createdAt: 1,
          },
          Author: {
            _id: 1,
            username: 1,
            avatar: 1,
          },
        },
      },
      {
        $sort: {
          createAt: -1,
        },
      },
      {
        $match: {
          'Post.deleted': false,
        },
      },
    ]);
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: 'Not found data' });
    }
    return res.status(200).send({ message: 'Success', data: data });
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

export const getCommentByIdBlog = async (req, res) => {
  try {
    const { id } = req.params; //Fake post

    //get comment by id
    const comment = await commentsModel
      .find({ postId: id })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 });
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
    const body = req.body;
    const post = await Post.findById(body.postId);

    //Validate
    if (!post) {
      return res.status(404).send({ message: 'Fail', err: 'Some thing wrong' });
    }

    const user = await User.findById({ _id: body.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //send Comment && validate
    const { error } = CommentValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).send({ message: 'Fail', err: error.details.map((err) => err.message) });
    }
    const comment = await commentsModel.create(body);
    if (!comment) {
      return res.status(400).send({ message: 'Fail', err: "Can't to send comment!" });
    }

    // update Post
    await Post.findByIdAndUpdate(body.postId, {
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
