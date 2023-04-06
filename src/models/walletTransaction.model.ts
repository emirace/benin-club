import mongoose, { Schema } from 'mongoose';

export interface IWalletTransaction extends mongoose.Document {
  date: Date;
  description: string;
  amount: number;
}

const walletTransactionSchema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const WalletTransaction = mongoose.model<IWalletTransaction>(
  'WalletTransaction',
  walletTransactionSchema
);

export { WalletTransaction };
