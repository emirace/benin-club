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
        if (req.query.status) {
          const transactions: TransactionDocument[] = await Transaction.find({
            status: req.query.status,
          });
          res.status(200).json(transactions);
        } else {
          const transactions: TransactionDocument[] = await Transaction.find();
          res.status(200).json(transactions);
        }
        break;
      case 'POST':
        const { memberName, description, paymentMethod, amount } = req.body;
        const newTransaction: TransactionDocument = new Transaction({
          memberName,
          description,
          paymentMethod,
          amount,
        });
        console.log(newTransaction);
        await newTransaction.save();
        res.status(201).json(newTransaction);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
