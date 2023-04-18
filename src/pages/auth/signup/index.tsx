import Loading from '@/components/Loading';
import VerificationSuccess from '@/components/signup/VerificationSuccess';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';

interface Props {
  sent: boolean;
}
const SignUp: NextPage<Props> = ({ sent }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(sent);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Show success message
        setLoading(false);
        setEmailSent(true);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setLoading(false);
      }
    } catch (error) {
      setError('Something went wrong, pls try again later');
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="h-20 w-full bg-black" />
      {!emailSent ? (
        <div className="flex mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-20 mb-10 w-full">
          <div className="bg-white px-4 shadow-md rounded-lg md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="flex md:flex-row gap-4 ">
                <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
                  Sign
                </h2>
                <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
                  Up
                </h2>
              </div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                type="email"
                name="email"
                onChange={onChange}
                value={email}
                onFocus={() => setError('')}
              />
              {error ? (
                <div className="text-red text-sm mt-1">{error}</div>
              ) : (
                <div className="text-gray-500 text-sm mt-1">
                  Please enter your email to receive a verification email.
                </div>
              )}
              <div className="flex justify-end ml-6 mt-4">
                <button
                  className={loading ? buttonStyleOutline : buttonStyle}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center mt-4">
              {loading && <Loading />}
            </div>
          </div>
        </div>
      ) : (
        <VerificationSuccess email={email} />
      )}
    </>
  );
};

SignUp.getInitialProps = async ({ query }: NextPageContext) => {
  const { emailSent } = query;

  return { sent: emailSent ? true : false };
};
export default SignUp;
