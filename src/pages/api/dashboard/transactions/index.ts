import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import Transaction, {
  ITransaction,
  TransactionDocument,
} from '@/models/transaction.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import User from '@/models/user.model';

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

    switch (req.method) {
      case 'GET':
        if (loginUser.role !== 'admin' && loginUser.role !== 'wallet') {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        await connectDB();
        if (req.query.status) {
          const transactions: TransactionDocument[] = await Transaction.find()
            .sort({ createdAt: -1 })
            .populate({
              path: 'userId',
              select: 'surName firstName',
            });

          res.status(200).json(transactions);
        } else {
          const transactions: TransactionDocument[] = await Transaction.find();
          res.status(200).json(transactions);
        }
        break;
      case 'POST':
        if (loginUser.role !== 'admin' && loginUser.role !== 'bar') {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        await connectDB();

        if (!req.body || typeof req.body !== 'object') {
          return res.status(400).json({ message: 'Invalid request body' });
        }

        const { description, amount, memberId } = req.body;

        // Validate the transaction data
        const errors: string[] = [];

        if (!description) {
          errors.push('Description is required.');
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
          errors.push('Amount should be a positive number.');
        }

        if (!memberId) {
          errors.push('member ID is required.');
        }

        const member = await User.findOne({ memberId });
        if (!member) {
          errors.push('Invalid member ID');
        }

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Validation error', errors });
        }

        const transaction = new Transaction({
          description,
          amount,
          status: 'Pending',
          userId: member._id,
          paymentMethod: 'Wallet',
          type: 'debit',
          for: 'Wallet',
          reference: '',
          initiatedBy: loginUser,
          createdAt: new Date(),
        });

        res.status(201).json(transaction);

        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
