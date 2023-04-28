import mongoose, { Schema, Document } from 'mongoose';

interface IContact {
  address: string;
  tel: string;
}

interface IChild {
  name: string;
  age: number;
  school: string;
  sex: 'male' | 'female';
}

interface IEntryFee {
  fee: string;
  bal: number;
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

interface ISocial {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

interface IWallet {
  balance: number;
  transactions: {
    amount: number;
    date: Date;
  }[];
}

export interface IUser {
  [key: string]: any;
  memberId: string;
  firstName: string;
  surName: string;
  wife: string;
  subcriptionFee: number;
  subcriptionBal: number;
  wifeId: string;
  step: number;
  dob: string;
  employed: string;
  entryFeePayment: number;
  entryFeeBal: number;
  isNigeria: string;
  nationality: string;
  address: string;
  tel: number;
  permanent: IContact;
  bio: string;
  occupation: IContact;
  employer: string;
  business: IContact;
  nameOfBankers: string;
  married: string;
  socials: ISocial;
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
  image: string;
  email: string;
  status: 'Active' | 'Inactive';
  level:
    | 'Member'
    | 'Corporate Member'
    | 'Old Member'
    | 'Deseased Member'
    | 'Transfered'
    | 'Live Member'
    | 'Honorary Member';
  joinDate: Date;
  password?: string;
  gender: 'Male' | 'Female';
  position: 'Member' | 'President' | 'Vice President';
  verificationToken?: IVerificationToken | null;
  role: 'admin' | 'wallet' | 'user' | 'member';
  signupStep:
    | 'EmailVerification'
    | 'VerifyingEmail'
    | 'Verification'
    | 'ClubPayment'
    | 'Payment'
    | 'ProfileCreation'
    | 'Completed';
  wallet?: IWallet;
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

export type UserDocument = IUser & Document;

const userSchema = new Schema<IUser>(
  {
    memberId: { type: String },
    fullName: { type: String },
    wife: { type: String },
    wifeId: { type: String },
    dob: { type: String },
    nationality: { type: String },
    address: { type: String },
    tel: { type: Number },
    permanent: {
      address: { type: String },
      tel: { type: Number },
    },
    occupation: {
      address: { type: String },
      tel: { type: Number },
    },
    employer: { type: String },
    entryFeePayment: { type: Number, default: 1000000 },
    entryFeeBal: { type: Number, default: 0 },
    subcriptionFee: { type: Number, default: 50000 },
    subcriptionBal: { type: Number, default: 0 },
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
        school: { type: String },
        sex: { type: String, enum: ['male', 'female'] },
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
    image: { type: String, default: '/images/profile.webp' },
    email: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
      default: 'Female',
    },
    level: {
      type: String,
      required: true,
      enum: [
        'Member',
        'Corporate Member',
        'Old Member',
        'Deseased Member',
        'Transfered',
        'Live Member',
        'Honorary Member',
      ],
      default: 'Member',
    },
    position: {
      type: String,
      required: true,
      enum: ['Member', 'President', 'Vice President'],
      default: 'Member',
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
    bio: { type: String },
    socials: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
