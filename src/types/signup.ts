export interface SectionProps {
  formData: FormData;
  error: ErrorData;
  loading: boolean;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  handleError: (name: string, value: string) => void;
  setFormData: SetFormData;
}

export type SetFormData = (
  updateFormData: (prevFormData: FormData) => FormData
) => void;

export interface FormData {
  email: string;
  surname: string;
  firstName: string;
  dob: string;
  nationality: string;
  homeAddress: string;
  homeAddressTel: number;
  permanentAddress: string;
  permanentAddressTel: number;
  occupation: string;
  occupationTel: number;
  employer: string;
  businessAddress: string;
  businessAddressTel: number;
  nameOfBankers: string;
  employed: string;
  married: string;
  isNigeria: string;
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
  children: Child[];
  addressYears: string;
  emergencyContact: string;
  disability: string;
  sportSection: string;
  reasonToJoin: string;
  tribe: string;
  numberOfWives: string;
  educations: Education[];
  workExperiences: WorkExperience[];
  proposerPersonality: string;
  proposerKnown: string;

  // add more fields as needed
}

export interface ErrorData {
  general: string;
  email: string;
  surname: string;
  firstName: string;
  dob: string;
  nationality: string;
  homeAddress: string;
  homeAddressTel: string;
  permanentAddress: string;
  permanentAddressTel: string;
  occupation: string;
  occupationTel: string;
  employer: string;
  businessAddress: string;
  businessAddressTel: string;
  nameOfBankers: string;
  employed: string;
  married: string;
  isNigeria: string;
  clubMemberRelative: string;
  dependentRelativeBenin: string;
  residePermanentlyBenin: string;
  otherClubMember: string;
  playSport: string;
  knownAilment: string;
  transferOutOfBenin: string;
  chargedWithCriminalOffense: string;
  marriageDuration: string;
  numberOfChildren: string;
  children: string;
  addressYears: string;
  emergencyContact: string;
  disability: string;
  sportSection: string;
  reasonToJoin: string;
  tribe: string;
  numberOfWives: string;
  educations: string;
  workExperiences: string;
  proposerPersonality: string;
  proposerKnown: string;
  // add more fields as needed
}

export interface Child {
  name: string;
  age: number;
  school: string;
  sex: 'male' | 'female';
}
export interface Education {
  school: string;
  dates: string;
  qualifications: string;
}

export interface WorkExperience {
  from: string;
  to: string;
  employee: string;
  position: string;
  jobDescription: string;
}
