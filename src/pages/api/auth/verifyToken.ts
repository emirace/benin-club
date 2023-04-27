import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user.model';

export default async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      'verificationToken.token': token,
      'verificationToken.expires': { $gt: Date.now() },
    });

    res.status(200).json({ isValidToken: Boolean(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
