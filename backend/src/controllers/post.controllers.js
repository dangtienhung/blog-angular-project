import Post from '../models/posts.model.js';
import User from '../models/users.models.js';
import commentsModel from '../models/comments.model.js';
import { postValidate } from '../validates/posts.validate.js';

export const postController = {
  /* create post */
  createPost: async (req, res) => {
    try {
      const body = req.body;
      // console.log(req.user._id);
      /* validate */
      const { error } = postValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check users */
      // const authorId = body.author;
      // const user = await User.findById(authorId);
      // if (!user) {
      //   return res.status(400).json({ message: 'User not found' });
      // }
      /* create post */
      const post = await Post.create(body);
      if (!post) {
        return res.status(400).json({ message: 'Create post failed' });
      }
      /* update user post */
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { postList: post._id },
      });
      return res.status(200).json({ message: 'Create post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get all posts */
  getAllPosts: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [{ path: 'author', select: '-postList -isVerified -role -password' }, { path: 'category' }],
      };
      const query = q
        ? {
            $and: [
              {
                $or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }],
              },
              { deleted: false },
            ],
          }
        : { deleted: false };
      const posts = await Post.paginate(query, options);
      if (!posts) {
        return res.status(400).json({ message: 'Get all posts failed' });
      }
      return res.status(200).json({ message: 'Get all posts successfully', posts });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get post by id */
  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById({ _id: id }).populate([
        { path: 'author', select: '-postList -isVerified -role -password' },
        { path: 'category' },
      ]);
      if (!post) {
        return res.status(400).json({ message: 'Get post by id failed' });
      }
      return res.status(200).json({ message: 'Get post by id successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* update post */
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      /* validate */
      const { error } = postValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check users */
      const authorId = body.author;
      const user = await User.findById(authorId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      /* update post */
      const post = await Post.findByIdAndUpdate({ _id: id }, body, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Update post failed' });
      }
      /* delete user post */
      await User.findByIdAndUpdate(authorId, {
        $pull: { postList: post._id },
      });
      /* update user post */
      await User.findByIdAndUpdate(authorId, {
        $addToSet: { postList: post._id },
      });
      return res.status(200).json({ message: 'Update post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* delete fake */
  fakeDeletPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate({ _id: id }, { deleted: true }, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Delete post failed' });
      }
      return res.status(200).json({ message: 'Delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* undo delete fake */
  undoDeletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate({ _id: id }, { deleted: false }, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Undo delete post failed' });
      }
      return res.status(200).json({ message: 'Undo delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* delete post */
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndRemove(id);
      await commentsModel.findOneAndRemove({ postId: post._id });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { postList: id },
      });
      if (!post) {
        return res.status(400).json({ message: 'Delete post failed' });
      }
      return res.status(200).json({ message: 'Delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get related posts */
  getRelatedPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(400).json({ message: 'Get related posts failed' });
      }
      const relatedPosts = await Post.find({ category: post.category, _id: { $ne: id } });
      return res.status(200).json({ message: 'Get related posts successfully', posts: relatedPosts });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
