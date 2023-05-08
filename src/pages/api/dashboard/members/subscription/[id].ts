import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Transaction, { TransactionDocument } from '@/models/transaction.model';

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

    const { user: loginUser } = session;

    if (loginUser.role !== 'admin' && loginUser.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();
    const { id: userId } = req.query;

    switch (req.method) {
      case 'GET':
        // Find all transactions for the given user
        const transactions = await Transaction.find({
          userId: userId,
          for: 'subscription',
        });
        return res.status(200).json({ transactions });
        break;
      case 'PUT':
        const { subcriptionBal: amount } = req.body;
        console.log(amount);
        const updatedUser: IUser | null = await User.findById(userId);
        if (!updatedUser) {
          res.status(404).json({ message: 'User not found' });
        } else {
          updatedUser.subcriptionBal -= amount;
          const newUser = updatedUser.save();

          // Create a new transaction record
          const transaction: TransactionDocument = new Transaction({
            userId,
            type: 'credit',
            amount: parseInt(amount),
            reference: '',
            status: 'Completed',
            description: 'Subscription payment',
            paymentMethod: 'deposit',
            initiatedBy: loginUser._id,
            for: 'subscription',
          });
          await transaction.save();

          res.status(200).json(newUser);
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
