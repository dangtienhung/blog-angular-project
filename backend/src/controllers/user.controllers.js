import Post from '../models/posts.model.js';
import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
import { userValidate } from '../validates/users.validate.js';

export const userController = {
  /* get all user */
  getAllUser: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
      };
      const query = q
        ? {
            $and: [
              {
                $or: [{ username: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }],
              },
              { deleted: false },
            ],
          }
        : { deleted: false };
      const users = await User.paginate(query, options);
      if (!users) {
        return res.status(400).json({ msg: 'Get all users failed' });
      }
      /* loại bỏ password */
      users.docs = users.docs.map((user) => {
        const { password, ...other } = user._doc;
        return other;
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* get user by id */
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const { password, ...other } = user._doc;
      return res.status(200).json({ user: other });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* update status */
  updateStatus: async (req, res, deleteStatus) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, { deleted: deleteStatus }, { new: true });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const msg = deleteStatus ? 'Delete user successfully' : 'Undo delete user successfully';
      return res.status(200).json({ msg });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* delete fake */
  deleteFake: async (req, res) => {
    try {
      const body = req.body;
      await userController.updateStatus(req, res, body.deleted);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* undo delete */
  undoDelete: async (req, res) => {
    await userController.updateStatus(req, res, false);
  },
  /* delete real */
  deleteReal: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      /* delete post id */
      const postList = user.postList;
      if (postList.length > 0) {
        for (let i = 0; i < postList.length; i++) {
          const post = await Post.findByIdAndDelete(postList[i]);
          if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
          }
        }
      }
      return res.status(200).json({ msg: 'Delete user successfully' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* update user */
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      /* validate */
      const { error } = userValidate.validate(body);
      if (error) {
        const errors = error.details.map((err) => err.message);
        console.log('🚀 ~ file: user.controllers.js:114 ~ updateUser: ~ errors:', errors);
        return res.status(400).json({ msg: errors });
      }
      /*get old password*/
      const dataUser = await User.findById({ _id: id });
      /* check có password mới không thì mới được thay mới password */
      if (body.password) {
        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;
      }
      body.password = dataUser.password;
      /* check email đẩy lên có trùng mới email khác có trong db không */
      if (body.email !== dataUser.email) {
        const users = userController.getAllUser(req, res);
        console.log('🚀 ~ file: user.controllers.js:128 ~ updateUser: ~ users:', users);
      }
      /* check user */
      const user = await User.findByIdAndUpdate({ _id: id }, body, { new: true });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const { password, ...other } = user._doc;
      return res.status(200).json({ msg: 'Update user successfully', user: other });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* create user */
  createUser: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = userValidate.validate(body);
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ msg: errors });
      }
      /* check user */
      const user = await User.findOne({ email: body.email });
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' });
      }
      /* hash password */
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      /* check avatar */
      const avatar = body.avatar ? body.avatar : `https://api.multiavatar.com/${body.username}.png`;
      /* create user */
      const data = {
        ...body,
        avatar,
        password: hashedPassword,
      };
      const newUser = await User.create(data);
      if (!newUser) {
        return res.status(400).json({ msg: 'Create user failed' });
      }
      return res.status(200).json({ msg: 'Create user successfully', user: newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* count new user */
  countNewUser: async (req, res) => {
    try {
      /* get new user one day */
      let today = new Date();
      today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00.000
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Tăng ngày lên 1 để lấy đến 23:59:59.999
      const countUserDay = await User.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
      /* get new user one week */
      today = new Date();
      today.setHours(23, 59, 59, 999); // Đặt giờ về 00:00:00.000
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7); // Giảm ngày đi 7 để lấy từ ngày trước đó
      const countUserWeek = await User.countDocuments({ createdAt: { $gte: oneWeekAgo, $lt: today } });
      const countUserAll = await User.countDocuments();
      return res.status(200).json([
        { message: 'Số lượng người dùng được tạo trong ngày', count: countUserDay },
        { message: 'Số lượng người dùng được tạo mới trong tuần', count: countUserWeek },
        { message: 'Tổng số lượng người dùng', count: countUserAll },
      ]);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /* get users deleted */
  getUserDeleted: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
        populate: [{ path: 'postList', select: '_id title' }],
      };
      const query = q
        ? {
            $and: [
              {
                $or: [{ username: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }],
              },
              { deleted: true },
            ],
          }
        : { deleted: true };
      const users = await User.paginate(query, options);
      if (!users) {
        return res.status(400).json({ msg: 'Get all users failed' });
      }
      /* loại bỏ password */
      users.docs = users.docs.map((user) => {
        const { password, postList, ...other } = user._doc;
        return other;
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* get all post by userId */
  getAllPostByUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const { _page = 1, _limit = 10, q } = req.query;
      const query = q
        ? {
            $and: [
              {
                $or: [{ username: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }],
              },
              { deleted: false },
            ],
          }
        : { deleted: false };
      const users = await User.findById(id).populate({
        match: query,
        path: 'postList',
        populate: [
          { path: 'author', select: '-postList -isVerified -role -password' },
          { path: 'category', select: '-posts' },
        ],
      });
      const { password, ...other } = users._doc;
      if (!users) {
        return res.status(400).json({ msg: 'Get all users failed' });
      }
      return res.status(200).send({ message: 'success', data: other });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
