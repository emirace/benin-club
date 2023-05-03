import type { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '@/models/transaction.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handleGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user: loginUser } = session;
  const userId = loginUser._id;

  try {
    // Find all transactions for the given user
    const transactions = await Transaction.find({ userId });

    return res.status(200).json({
      transactions: transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while retrieving transactions',
    });
  }
}
