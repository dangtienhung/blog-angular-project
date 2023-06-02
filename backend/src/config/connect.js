import mongoose from 'mongoose';

export const ConnectDB = () => {
  mongoose
    // .connect('mongodb+srv://nhung231517:890997@cluster0.xdnfbi1.mongodb.net/')
    .connect('mongodb://127.0.0.1:27017/angular_blog')
    // .connect('mongodb://root:Nhung09%40@localhost:27017/angular_blog?authSource=admin&readPreference=primary&ssl=false')
    .then(() => {
      console.log('Connect to DB');
    })
    .catch(() => {
      console.log('Connect error');
    });
};
