import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/models/user.model';

export default async function verifyEmailToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.query;

  // Find the user with the matching verification token
  const user = await User.findOne({
    verificationToken: { token, expires: { $gt: Date.now() } },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Update the user's status to "verified"
  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  // Redirect the user to the login page or send a success message
  return res.status(200).json({ message: 'Email address verified' });
}
