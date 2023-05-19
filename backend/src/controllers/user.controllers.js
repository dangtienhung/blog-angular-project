import User from '../models/users.models.js';
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
      return res.status(200).json(user);
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
    await userController.updateStatus(req, res, true);
  },
  /* undo delete */
  undoDelete: async (req, res) => {
    await userController.updateStatus(req, res, false);
  },
  /* delete real */
  deleteReal: async (req, res) => {
    await userController.updateStatus(req, res, true);
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
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
        return res.status(400).json({ msg: errors });
      }
      /* check user */
      const user = await User.findByIdAndUpdate({ _id: id }, body, { new: true });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      return res.status(200).json({ msg: 'Update user successfully', user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
