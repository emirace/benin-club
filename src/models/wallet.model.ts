import { Schema, model, Document, models } from 'mongoose';

export interface IWallet {
  userId: number;
  balance: number;
}

export type WalletDocument = IWallet & Document;

const walletSchema = new Schema<WalletDocument>({
  userId: { type: Number, required: true },
  balance: { type: Number, default: 0, required: true },
});

const Wallet = models.Wallet || model<WalletDocument>('Wallet', walletSchema);

export default Wallet;
