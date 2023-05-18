import mongoose from 'mongoose';
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [3, 'Too short'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
