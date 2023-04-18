import { FormData } from '@/types/signup';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';
import User, { IUser } from '@/models/user.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select(
      '-password -_id'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    switch (req.method) {
      case 'GET':
        return res.status(200).json(user);

      case 'POST':
        user.sigupStep = 'Verification';
        await user.save();
        return res.status(200).json({ message: 'User created successfully.' });

      case 'PUT':
        const formData: FormData = req.body;
        Object.keys(formData).forEach((key) => {
          const value = formData[key];
          if (value !== '') {
            user[key] = value;
          }
        });

        await user.save();
        return res.status(200).json({ message: 'User updated successfully.' });

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
