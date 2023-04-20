import { buttonStyle } from '@/constants/styles';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

interface Props {}
const Page: NextPage<Props> = () => {
  const router = useRouter();

  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSbmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/payment', {
        method: 'POST',
        body: JSON.stringify({ transaction }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(response);
        router.push('/auth/signup/form');
        setLoading(false);
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
      <div className="h-24 w-full bg-black" />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <button onClick={handleSbmit} className={buttonStyle}>
          Make Payment
        </button>
        <div className="mt-8">{loading && <Loading />}</div>
      </div>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (session.user.signupStep !== 'Payment') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
