import { Document, models, model, Schema } from 'mongoose';

export interface IPost {
  image: string;
  date: Date;
  tags: string[];
  title: string;
  description: string;
}

export type PostDocument = IPost & Document;

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = models.Post || model<PostDocument>('Post', postSchema);

export default Post;
