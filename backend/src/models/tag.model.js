import mongoose from 'mongoose';
const { Schema } = mongoose;
const tagSchema = new Schema({
  title: { type: String, trim: true },
  slug: { type: String, trim: true, unique: true },
});

export default mongoose.model('Tag', tagSchema, 'Tag');
