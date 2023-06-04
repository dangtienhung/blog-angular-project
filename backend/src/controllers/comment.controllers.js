import Comment from '../models/comments.model.js';
import { CommentValidate } from '../validates/comment.validate.js';
import Post from '../models/posts.model.js';
import User from '../models/users.models.js';

export const commentController = {
  /* create */
  createComment: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = CommentValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check */
      const user = await User.findById({ _id: body.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const post = await Post.findById({ _id: body.postId });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      /* post comment */
      const comment = await Comment.create(body);
      return res.status(200).json({ message: 'Comment created', comment });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* update */
  updateComment: async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
      /* validate */
      const { error } = CommentValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check */
      const user = await User.findById({ _id: body.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const post = await Post.findById({ _id: body.postId });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      /* update comment */
      const comment = await Comment.findByIdAndUpdate({ _id: id }, body, { new: true });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json({ message: 'Comment updated', comment });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* get all */
  getAllComments: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
      };
      const query = q
        ? {
            $and: [{ $or: [{ content: { $regex: q, $options: 'i' } }] }, { deleted: false }],
          }
        : { deleted: false };
      const comments = await Comment.paginate(query, options);
      return res.status(200).json({ message: 'Get all comments', comments });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* update deleted */
  updateDeleted: async (req, res, deletedStatus) => {
    try {
      const id = req.params.id;
      const commnent = await Comment.findByIdAndUpdate({ _id: id }, { deleted: deletedStatus }, { new: true });
      if (!commnent) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* delete fake */
  fakeDelete: async (req, res) => {
    await commentController.updateDeleted(req, res, true);
  },
  /* undo delete */
  undoDelete: async (req, res) => {
    await commentController.updateDeleted(req, res, false);
  },
  /* delete real */
  realDelete: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByIdAndDelete({ _id: id });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* count comment */
  countComment: async (req, res) => {
    try {
      /* get new comment one day */
      let today = new Date();
      today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00.000
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Tăng ngày lên 1 để lấy đến 23:59:59.999
      const countCommentDay = await Comment.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
      /* get new comment one week */
      today = new Date();
      today.setHours(23, 59, 59, 999); // Đặt giờ về 00:00:00.000
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7); // Giảm ngày đi 7 để lấy từ ngày trước đó
      const countCommentWeek = await Comment.countDocuments({ createdAt: { $gte: oneWeekAgo, $lt: today } });
      return res.status(200).json([
        { message: 'Số lượng người dùng được tạo trong ngày', count: countCommentDay },
        { message: 'Số lượng người dùng được tạo mới trong tuần', count: countCommentWeek },
      ]);
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
};
