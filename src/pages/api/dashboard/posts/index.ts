import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import Post, { PostDocument } from '@/models/post.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: 'You must log in to access this resource.' });

    const { user: loginUser } = session;

    if (loginUser.role !== 'admin' && loginUser.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        const posts: PostDocument[] = await Post.find();
        res.status(200).json(posts);
        break;
      case 'POST':
        console.log(req.body);
        const newPost: PostDocument = new Post(req.body);
        console.log(newPost);
        await newPost.save();
        res.status(201).json(newPost);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
