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
        const currentUser = await User.findOne({
          email: session.user.email,
        });

        currentUser.signupStep = 'Verification';
        console.log(currentUser);
        await currentUser.save();
        return res.status(200).json({ message: 'User created successfully.' });

      case 'PUT':
        const formData: FormData = req.body;

        const currentUser2 = await User.findOne({
          email: session.user.email,
        }).select(
          '-password  -memberId -subcriptionFee -subcriptionBal -entryFeePayment -entryFeeBal -status -level -joinDate -password -position -verificationToken -role -signupStep -wallet '
        );

        const disallowedKeys = [
          'memberId',
          'subcriptionFee',
          'subcriptionBal',
          'entryFeePayment',
          'entryFeeBal',
          'status',
          'level',
          'joinDate',
          'password',
          'position',
          'verificationToken',
          'role',
          'signupStep',
          'wallet',
          'nameOfBankers',
        ]; // add the keys that are not allowed to be updated

        // Remove disallowed keys from formData object
        disallowedKeys.forEach((key) => {
          if (currentUser2.hasOwnProperty(key)) {
            // check if currentUser2 has the key
            delete formData[key];
          }
        });

        // Update currentUser2 object with remaining formData keys and values
        Object.keys(formData).forEach((key) => {
          const value = formData[key];
          if (!disallowedKeys.includes(key) && value !== '') {
            currentUser2[key] = value;
          }
        });
        console.log(currentUser2);
        await currentUser2.save();
        return res.status(200).json({ message: 'User updated successfully.' });

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
