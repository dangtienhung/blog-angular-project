import mongoose from 'mongoose';

export const ConnectDB = () => {
  mongoose
    .connect('mongodb+srv://nhung231517:890997@cluster0.xdnfbi1.mongodb.net/')
    .then(() => {
      console.log('Connect to DB');
    })
    .catch(() => {
      console.log('Connect error');
    });
};
