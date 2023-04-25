import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET':
        const user: IUser | null = await User.findById(req.query.id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json(user);
        }
        break;
      case 'PUT':
        const updatedUser: IUser | null = await User.findByIdAndUpdate(
          req.query.id,
          req.body,
          { new: true }
        );
        if (!updatedUser) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json(updatedUser);
        }
        break;
      case 'DELETE':
        const deletedUser: IUser | null = await User.findByIdAndDelete(
          req.query.id
        );
        if (!deletedUser) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json(deletedUser);
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
