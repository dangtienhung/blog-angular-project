import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;
const CommenentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: { type: String },
  },
  { timestamps: true, versionKey: false }
);

CommenentSchema.plugin(mongoosePaginate);

export default mongoose.model('Comment', CommenentSchema, 'Comment');
