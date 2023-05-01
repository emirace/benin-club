import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';
import User from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.signupStep = 'ProfileCreation';
    user.save();

    return res.status(200).json({ message: 'Payment completed' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
