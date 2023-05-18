import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *         - category
 *         - images
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The post title
 *         content:
 *           type: string
 *           description: The post content
 *         author:
 *           type: string
 *           description: The post author
 *         category:
 *           type: string
 *           description: The post category
 *         images:
 *           type: string
 *           description: The post images
 *       example:
 *         title: Post title
 *         content: Post content
 *
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);
export default Post;
