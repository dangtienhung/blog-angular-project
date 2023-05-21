import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const CommenentSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CommenentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model('Comment', CommenentSchema);
export default Comment;
