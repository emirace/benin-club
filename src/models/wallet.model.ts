import mongoose, { Schema } from 'mongoose';
import { ITransaction } from './transaction.model';

export interface IWallet extends mongoose.Document {
  balance: number;
  transactions: ITransaction[];
}

const walletSchema = new Schema({
  balance: { type: Number, required: true, default: 0 },
  transactions: { type: [Schema.Types.ObjectId], ref: 'Transaction' },
});

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);

export { Wallet };
