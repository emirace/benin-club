import mongoose, { Schema } from 'mongoose';

export interface IWalletTransaction {
  [key: string]: any;
  _id: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed';
  invoiceId: string;
  memberName: string;
  paymentMethod: string;
  createdAt: string;
}

const walletTransactionSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    description: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    invoiceId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const WalletTransaction =
  mongoose.models.WalletTransaction ||
  mongoose.model<IWalletTransaction>(
    'WalletTransaction',
    walletTransactionSchema
  );

export { WalletTransaction };
