import { authValidate, loginValidate } from '../validates/auth.validate.js';

import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../config/nodemailler.js';

export const authController = {
  /* generate token */
  generateToken: (user) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  },
  /* refresh token */
  refreshToken: (user) => {
    return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  },
  /* register */
  register: async (req, res) => {
    try {
      const body = req.body;
      console.log(body);
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
        avatar: `https://api.multiavatar.com/${body.username}.png`,
        phone: '',
        address: '',
      };
      const user = await User.create(data);
      if (!user) {
        return res.status(400).json({ message: 'Register failed' });
      }
      /* gennerate token */
      const token = authController.generateToken(user);
      /* mailer */
      const linkToVerify = `http://localhost:8080/api/v1/auth/verify?token=${token}`;
      // const info = await sendVerificationEmail(user, linkToVerify);
      // if (!info) {
      //   return res.status(400).json({ message: 'Send mail failed' });
      // }
      return res.status(200).json({ message: 'Register successfully', accessToken: token, user });
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
  /* verify */
  verifyAccount: async (req, res) => {
    try {
      const token = req.query.token;
      console.log('🚀 ~ file: auth.controllers.js:92 ~ verifyAccount: ~ token:', token);
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
      /* verify token */
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: 'Token is invalid' });
        }
        /* check user */
        const userId = decoded._id;
        const user = await User.findById({ _id: userId });
        console.log('🚀 ~ file: auth.controllers.js:104 ~ jwt.verify ~ user:', user);
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
        /* update user */
        const updateUser = await User.findByIdAndUpdate({ _id: userId }, { isVerified: true }, { new: true });
        if (!updateUser) {
          return res.status(400).json({ message: 'Update user failed' });
        }
        return res.status(200).json({ message: 'Verify account successfully' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
