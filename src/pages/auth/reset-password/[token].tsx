import Loading from '@/components/Loading';
import ResetPasswordForm from '@/components/signup/ResetPasswordForm';
import { useEffect, useState } from 'react';

interface Props {
  token: string;
}

export default function ResetPassword({ token }: Props) {
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/verifyToken?token=${token}`);
        const data = await response.json();
        setIsValidToken(data.isValidToken);
      } catch (error) {
        console.error(error);
      }
    };
    verifyToken();
  }, [token]);

  if (isValidToken === null) {
    return (
      <div>
        <div className="bg-black w-full h-24 " />
        <div className="justify-center items-center w-full h-screen">
          <Loading />
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div>
        <div className="bg-black w-full h-24 " />
        <div className="p-24 text-red flex justify-center items-center">
          Invalid or expired token
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
