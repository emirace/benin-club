import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import Post, { PostDocument } from '@/models/post.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET':
        const post: PostDocument | null = await Post.findById(req.query.id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.status(200).json(post);
        }
        break;
      case 'PUT':
        const updatedPost: PostDocument | null = await Post.findByIdAndUpdate(
          req.query.id,
          req.body,
          { new: true }
        );
        if (!updatedPost) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.status(200).json(updatedPost);
        }
        break;
      case 'DELETE':
        const deletedPost: PostDocument | null = await Post.findByIdAndDelete(
          req.query.id
        );
        if (!deletedPost) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.status(200).json(deletedPost);
        }
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
