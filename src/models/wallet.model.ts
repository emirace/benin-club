import mongoose, { Schema } from 'mongoose';
import { IWalletTransaction } from './walletTransaction.model';

export interface IWallet extends mongoose.Document {
  balance: number;
  transactions: IWalletTransaction[];
}

const walletSchema = new Schema({
  balance: { type: Number, required: true, default: 0 },
  transactions: { type: [Schema.Types.ObjectId], ref: 'WalletTransaction' },
});

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);

export { Wallet };
