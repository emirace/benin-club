import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import Wallet, { WalletDocument } from '@/models/wallet.model';

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

    const { user } = session;

    if (user.role !== 'admin' && user.role !== 'wallet') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        const wallets: WalletDocument[] = await Wallet.find();
        res.status(200).json(wallets);
        break;
      case 'POST':
        const { userId } = req.body;
        const newUser: WalletDocument = new Wallet({ userId });
        await newUser.save();
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
