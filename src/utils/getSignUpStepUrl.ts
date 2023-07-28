type SignupStep =
  | 'EmailVerification'
  | 'VerifyingEmail'
  | 'Payment'
  | 'ProfileCreation'
  | 'Verification'
  | 'ClubPayment'
  | 'Completed';

const getSignupStepUrl = (signupStep: SignupStep): string | null => {
  const signupStepUrls: Record<SignupStep, string | null> = {
    EmailVerification: '/auth/signup',
    VerifyingEmail: '/auth/signup?emailSent=yes',
    Payment: '/auth/form-payment',
    ProfileCreation: '/auth/signup/form',
    Verification: '/auth/success',
    ClubPayment: '/auth/clubfee',
    Completed: null,
  };

  return signupStepUrls[signupStep] || null;
};

export default getSignupStepUrl;
