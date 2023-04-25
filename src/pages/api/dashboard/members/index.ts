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
        const members: IUser[] = await User.find();
        res.status(200).json(members);
        break;
      case 'POST':
        const { memberId } = req.body;
        console.log(memberId);
        const newUser: IUser = new User({ memberId });
        console.log(newUser);
        await newUser.save();
        console.log(newUser);
        res.status(201).json(newUser);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
