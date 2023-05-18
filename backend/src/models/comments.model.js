import mongoose from 'mongoose';
const { Schema } = mongoose;
const CommenentSchema = new Schema(
  {
    userId: { type: Number },
    postId: { type: Number },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Comment', CommenentSchema);
