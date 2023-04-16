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
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
}

interface IVerificationToken {
  token: string;
  expiryDate: Date;
}

interface IWallet {
  balance: number;
  transactions: {
    amount: number;
    date: Date;
  }[];
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dob: string;
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
  _id?: string;
  image?: string;
  email: string;
  status: 'Active' | 'Inactive';
  level: 'Basic' | 'Premium' | 'VIP';
  joinDate: Date;
  renewalDate: Date;
  password: string;
  verificationToken?: IVerificationToken | null;
  role: 'admin' | 'wallet' | 'user' | 'member';
  signupStep: 'EmailVerification' | 'Payment' | 'ProfileCreation' | 'Completed';
  wallet?: IWallet;
}

const ContactSchema = new Schema({
  address: { type: String, required: true },
  tel: { type: Number, required: true },
});

const ChildSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const EducationSchema = new Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  date: { type: String, required: true },
});

const WorkExperienceSchema = new Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const VerificationTokenSchema = new Schema({
  token: { type: String, required: true },
  expiryDate: { type: Date, required: true },
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

const userSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  dob: { type: String },
  nationality: { type: String },
  home: { type: ContactSchema },
  permanent: { type: ContactSchema },
  occupation: { type: ContactSchema },
  employer: { type: String },
  business: { type: ContactSchema },
  nameOfBankers: { type: String },
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
  children: { type: [ChildSchema] },
  addressYears: { type: String },
  emergencyContact: { type: String },
  disability: { type: String },
  sportSection: { type: String },
  reasonToJoin: { type: String },
  tribe: { type: String },
  numberOfWives: { type: String },
  educations: { type: [EducationSchema] },
  workExperiences: { type: [WorkExperienceSchema] },
  proposerPersonality: { type: String },
  proposerKnown: { type: String },
  image: { type: String },
  email: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'Inactive'] },
  level: { type: String, required: true, enum: ['Basic', 'Premium', 'VIP'] },
  joinDate: { type: Date, required: true },
  renewalDate: { type: Date, required: true },
  password: { type: String, required: true },
  verificationToken: { type: VerificationTokenSchema, default: null },
  signupStep: {
    type: String,
    required: true,
    enum: ['EmailVerification', 'Payment', 'ProfileCreation', 'Completed'],
  },
  wallet: { type: WalletSchema },
});
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
