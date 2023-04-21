import mongoose, { Schema, Document } from 'mongoose';

interface IContact {
  address: string;
  tel: number;
}

interface IChild {
  name: string;
  age: number;
}

interface IEducation {
  degree: string;
  school: string;
  date: string;
}

interface IWorkExperience {
  position: string;
  employee: string;
  to: string;
  from: string;
  jobDescription: string;
}

interface IVerificationToken {
  token: string;
  expires: Date;
}

interface IWallet {
  balance: number;
  transactions: {
    amount: number;
    date: Date;
  }[];
}

export interface IUser extends Document {
  [key: string]: any;
  firstName: string;
  surName: string;
  step: number;
  lastName: string;
  dob: string;
  employed: string;
  isNigeria: string;
  nationality: string;
  home: IContact;
  permanent: IContact;
  occupation: IContact;
  employer: string;
  business: IContact;
  nameOfBankers: string;
  married: string;
  clubMemberRelative: string;
  dependentRelativeBenin: string;
  residePermanentlyBenin: string;
  otherClubMember: string;
  playSport: string;
  knownAilment: string;
  transferOutOfBenin: string;
  chargedWithCriminalOffense: string;
  marriageDuration: number;
  numberOfChildren: number;
  children: IChild[];
  addressYears: string;
  emergencyContact: string;
  disability: string;
  sportSection: string;
  reasonToJoin: string;
  tribe: string;
  numberOfWives: string;
  educations: IEducation[];
  workExperiences: IWorkExperience[];
  proposerPersonality: string;
  proposerKnown: string;
  _id: string;
  image: string;
  email: string;
  status: 'Active' | 'Inactive';
  level: 'Basic' | 'Premium' | 'VIP';
  joinDate: Date;
  renewalDate: Date;
  password: string;
  verificationToken: IVerificationToken | null;
  role: 'admin' | 'wallet' | 'user' | 'member';
  signupStep:
    | 'EmailVerification'
    | 'VerifyingEmail'
    | 'Verification'
    | 'ClubPayment'
    | 'Payment'
    | 'ProfileCreation'
    | 'Completed';
  wallet: IWallet;
}

const VerificationTokenSchema = new Schema({
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

const WalletSchema = new Schema({
  balance: { type: Number, required: true, default: 0 },
  transactions: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    surName: { type: String },
    lastName: { type: String },
    dob: { type: String },
    nationality: { type: String },
    home: {
      address: { type: String },
      tel: { type: Number },
    },
    permanent: {
      address: { type: String },
      tel: { type: Number },
    },
    occupation: {
      address: { type: String },
      tel: { type: Number },
    },
    employer: { type: String },
    business: {
      address: { type: String },
      tel: { type: Number },
    },
    nameOfBankers: { type: String },
    employed: { type: String },
    isNigeria: { type: String },
    married: { type: String },
    clubMemberRelative: { type: String },
    dependentRelativeBenin: { type: String },
    residePermanentlyBenin: { type: String },
    otherClubMember: { type: String },
    playSport: { type: String },
    knownAilment: { type: String },
    transferOutOfBenin: { type: String },
    chargedWithCriminalOffense: { type: String },
    marriageDuration: { type: Number },
    numberOfChildren: { type: Number },
    children: [
      {
        name: { type: String },
        age: { type: Number },
      },
    ],
    addressYears: { type: String },
    emergencyContact: { type: String },
    disability: { type: String },
    sportSection: { type: String },
    reasonToJoin: { type: String },
    tribe: { type: String },
    numberOfWives: { type: String },
    educations: [
      {
        degree: { type: String },
        school: { type: String },
        date: { type: String },
      },
    ],
    workExperiences: [
      {
        position: { type: String },
        employee: { type: String },
        from: { type: String },
        to: { type: String },
        jobDescription: { type: String },
      },
    ],
    proposerPersonality: { type: String },
    proposerKnown: { type: String },
    image: { type: String },
    email: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
    level: {
      type: String,
      required: true,
      enum: ['Basic', 'Premium', 'VIP'],
      default: 'Basic',
    },
    joinDate: { type: Date },
    renewalDate: { type: Date },
    password: { type: String },
    verificationToken: { type: VerificationTokenSchema, default: null },
    signupStep: {
      type: String,
      required: true,
      enum: [
        'EmailVerification',
        'VerifyingEmail',
        'Payment',
        'ProfileCreation',
        'Verification',
        'ClubPayment',
        'Completed',
      ],
      default: 'EmailVerification',
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'wallet', 'user', 'member'],
      default: 'member',
    },
    wallet: { type: WalletSchema },
    step: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
