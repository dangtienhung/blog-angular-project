import { authValidate, loginValidate } from '../validates/auth.validate.js';

import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authController = {
  /* generate token */
  generateToken: (user) => {
    return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  },
  /* refresh token */
  refreshToken: (user) => {
    return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  },
  /* register */
  register: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = authValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check user */
      const exists = await User.findOne({ email: body.email });
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      /* hash password */
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      /* create user */
      const data = {
        ...body,
        password: hashedPassword,
      };
      const user = await User.create(data);
      if (!user) {
        return res.status(400).json({ message: 'Register failed' });
      }
      return res.status(200).json({ message: 'Register successfully', user });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* login */
  login: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = loginValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* check user */
      const useExits = await User.findOne({ email: body.email });
      if (!useExits) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }
      /* check password */
      const validPassword = await bcrypt.compare(body.password, useExits.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }
      if (useExits && validPassword) {
        /* generate token */
        const token = authController.generateToken(useExits);
        const { password, ...others } = useExits._doc;
        return res.status(200).json({ message: 'Login successfully', accessToken: token, user: others });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
