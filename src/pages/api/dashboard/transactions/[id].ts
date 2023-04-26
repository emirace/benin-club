import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import Transaction, { TransactionDocument } from '@/models/transaction.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET':
        const transaction: TransactionDocument | null =
          await Transaction.findById(req.query.id);
        if (!transaction) {
          res.status(404).json({ message: 'Transaction not found' });
        } else {
          res.status(200).json(transaction);
        }
        break;
      case 'PUT':
        const updatedPost: TransactionDocument | null =
          await Transaction.findByIdAndUpdate(
            req.query.id,
            { status: req.body.status },
            { new: true }
          );
        if (!updatedPost) {
          res.status(404).json({ message: 'Transaction not found' });
        } else {
          res.status(200).json(updatedPost);
        }
        break;
      case 'DELETE':
        const deletedPost: TransactionDocument | null =
          await Transaction.findByIdAndDelete(req.query.id);
        if (!deletedPost) {
          res.status(404).json({ message: 'Transaction not found' });
        } else {
          res.status(200).json(deletedPost);
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
