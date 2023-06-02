import mongoose from 'mongoose';

const { Schema } = mongoose;
const tagSchema = new Schema(
  {
    title: { type: String, trim: true },
    slug: { type: String, trim: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Tag', tagSchema, 'Tag');
