import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/utils/auth';
import connectDB from '@/utils/mongoose';
import { User } from '@/models/user.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(422).json({ message: 'Missing password field' });
  }

  try {
    await connectDB();

    const hashedPassword = await hashPassword(password);

    const user = await User.findOneAndUpdate(
      { resetToken: req.query.token },
      { $set: { password: hashedPassword }, $unset: { resetToken: '' } }
    );

    if (!user.value) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired reset token' });
    }

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
