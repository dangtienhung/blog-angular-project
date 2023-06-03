import Category from '../models/categories.model.js';
import Post from '../models/posts.model.js';
import User from '../models/users.models.js';
import commentsModel from '../models/comments.model.js';
import { postValidate } from '../validates/posts.validate.js';

export const postController = {
  /* create post */
  createPost: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = postValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* create post */
      const post = await Post.create(body);
      if (!post) {
        return res.status(400).json({ message: 'Create post failed' });
      }
      /* update user post */
      await User.findByIdAndUpdate(body.author, {
        $addToSet: { postList: post._id },
      });
      /* update category */
      await Category.findByIdAndUpdate(body.category, {
        $addToSet: { posts: post._id },
      });
      return res.status(200).json({ message: 'Create post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get all posts && status = approved */
  getAllPostsWithStatusApproved: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, category, q } = req.query;
      let query = {};
      let cateId;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [
          { path: 'author', select: '-postList -isVerified -role -password' },
          { path: 'category', select: '-posts' },
          { path: 'tags' },
        ],
      };
      if (category) {
        cateId = await Category.findOne({ slug: { $regex: category, $options: 'i' } });
      }
      query = q
        ? {
            $and: [
              {
                $or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }],
              },
              { deleted: false, status: 'approved' },
            ],
          }
        : { deleted: false, status: 'approved' };
      if (category) {
        query['category'] = { _id: cateId._id };
      }
      const posts = await Post.paginate(query, options);
      if (!posts.docs) {
        return res.status(400).json({ message: 'Get all posts failed' });
      }
      return res.status(200).json({ message: 'Get all posts successfully', posts });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get all post */
  getAllPosts: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, category, q } = req.query;
      let query = {};
      let cateId;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [
          { path: 'author', select: '-postList -isVerified -role -password' },
          { path: 'category', select: '-posts' },
          { path: 'tags' },
        ],
      };
      if (category) {
        cateId = await Category.findOne({ slug: { $regex: category, $options: 'i' } });
      }
      query = q
        ? {
            $and: [
              {
                $or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }],
              },
            ],
          }
        : {};
      if (category) {
        query['category'] = { _id: cateId._id };
      }
      const posts = await Post.paginate(query, options);
      if (!posts.docs) {
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
        { path: 'category', select: '-posts' },
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
      /* update post */
      const post = await Post.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      console.log(post);
      if (!post) {
        return res.status(400).json({ message: 'Update post failed' });
      }
      /* update category */
      await Category.findByIdAndUpdate(post.category, {
        $pull: { posts: post._id },
      });
      const categoryId = post.category;
      await Category.findByIdAndUpdate(categoryId, {
        $addToSet: { posts: post._id },
      });
      return res.status(200).json({ message: 'Update post successfully' });
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
      if (!post) {
        return res.status(400).json({ message: 'Delete post failed' });
      }
      await commentsModel.findOneAndRemove({ postId: post._id });
      await User.findByIdAndUpdate(post.author, {
        $pull: { postList: post._id },
      });
      await Category.findByIdAndUpdate(post.category, {
        $pull: { posts: post._id },
      });
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
  /* liệt kê số lượng bài viết được tạo ra trong 1 ngày/ 1 tháng/ 1 tuần */
  getCountPostNew: async (req, res) => {
    try {
      const oneMonthAgo = new Date();
      const oneDayAgo = new Date();
      const oneWeekAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Lấy tháng 1 tháng trước
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const countMonth = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });
      const countWeek = await Post.countDocuments({ createdAt: { $gte: oneWeekAgo } });
      const countDay = await Post.countDocuments({ createdAt: { $gte: oneDayAgo } });
      res.json({ count: { month: countMonth, week: countWeek, day: countDay } });
    } catch (err) {
      console.error('Lỗi khi đếm số lượng bài post:', err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  },
  /* get all post with status pending */
  getAllPostWithStatusPending: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [
          { path: 'author', select: '-postList -isVerified -role -password' },
          { path: 'category', select: '-posts' },
          { path: 'tags' },
        ],
      };
      const query = q
        ? {
            $and: [
              {
                $or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }],
              },
              { deleted: false, status: 'pending' },
            ],
          }
        : { deleted: false, status: 'pending' };
      const posts = await Post.paginate(query, options);
      if (!posts.docs) {
        return res.status(400).json({ message: 'Get all posts failed' });
      }
      return res.status(200).json({ message: 'Get all posts successfully', posts });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};
