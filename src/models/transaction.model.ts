import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction {
  [key: string]: any;
  description: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed';
  invoiceId: string;
  memberName: string;
  paymentMethod: string;
}

export type TransactionDocument = ITransaction & Document;

const transactionSchema = new Schema<TransactionDocument>(
  {
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    description: { type: String, required: true },
    memberName: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    invoiceId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre<TransactionDocument>('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const prefix = 'INV-';
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await Transaction.countDocuments();

  this.invoiceId = `${prefix}${currentDate}-${count + 1}`;

  next();
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default Transaction;
