import mongoose, { Schema } from 'mongoose';
import { IWallet } from './wallet.model';

interface IVerificationToken {
  token: string;
  expires: Date;
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status: 'Active' | 'Inactive';
  level: 'Basic' | 'Premium' | 'VIP';
  joinDate: Date;
  renewalDate: Date;
  password: string;
  verificationToken?: IVerificationToken | null;
  paymentInfo?: string;
  signupStep: 'EmailVerification' | 'Payment' | 'ProfileCreation' | 'Completed';
  wallet?: IWallet;
}

const verificationTokenSchema = new Schema({
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        'Email address is not valid',
      ],
    },
    signupStep: {
      type: String,
      enum: ['EmailVerification', 'Payment', 'ProfileCreation', 'Completed'],
      default: 'EmailVerification',
    },

    paymentInfo: {
      type: String,
    },

    password: {
      type: String,
    },
    firstName: {
      type: String,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name cannot be longer than 50 characters'],
    },
    lastName: {
      type: String,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [50, 'Last name cannot be longer than 50 characters'],
    },
    verificationToken: { type: verificationTokenSchema },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
    level: {
      type: String,
      enum: ['Basic', 'Premium', 'VIP'],
      default: 'Basic',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    renewalDate: {
      type: Date,
      default: Date.now,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// userSchema.statics.findByEmail = async function (email: string) {
//   const user = await this.findOne({ email });
//   return user || null;
// };

// const validateUser = (user: any) => {
//   const validationError = User.validate(user).error;
//   if (validationError) {
//     const errorMessage = validationError.message.replace(
//       /user validation failed: /i,
//       ""
//     );
//     throw new Error(errorMessage);
//   }
// };

export { User };
