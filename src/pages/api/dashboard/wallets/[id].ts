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
        const wallet: WalletDocument | null = await Wallet.findById(
          req.query.id
        );
        if (!wallet) {
          res.status(404).json({ message: 'Wallet not found' });
        } else {
          res.status(200).json(wallet);
        }
        break;
      case 'PUT':
        const { balance } = req.body;
        const updatedWallet: WalletDocument | null =
          await Wallet.findByIdAndUpdate(
            req.query.id,
            { balance },
            { new: true }
          );
        if (!updatedWallet) {
          res.status(404).json({ message: 'Wallet not found' });
        } else {
          res.status(200).json(updatedWallet);
        }
        break;
      // case 'DELETE':
      //   const deletedWallet: WalletDocument | null =
      //     await Wallet.findByIdAndDelete(req.query.id);
      //   if (!deletedWallet) {
      //     res.status(404).json({ message: 'Wallet not found' });
      //   } else {
      //     res.status(200).json(deletedWallet);
      //   }
      //   break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
