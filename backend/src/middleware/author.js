import jwt from 'jsonwebtoken';

export const authors = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer')) {
      return res.status(400).send({ message: 'fail', err: "You don't signin" });
    }

    const token = auth.split(' ')[1];
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).send({ message: 'fail', err: error });
  }
};

export const authorUser = async (req, res, next) => {
  try {
    const user = req.user;
    // console.log(user);
    if (!['user', 'admin', 'superadmin'].includes(user.role)) {
      return res.status(200).send({ message: 'fail', err: 'you do not have permission' });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: 'fail', err: error });
  }
};

export const authorAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!['admin', 'superadmin'].includes(user.role)) {
      return res.status(200).send({ message: 'fail', err: 'you do not have permission' });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: 'fail', err: error });
  }
};
