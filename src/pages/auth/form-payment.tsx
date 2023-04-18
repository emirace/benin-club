import { buttonStyle } from '@/constants/styles';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
interface Props {}
const Page: NextPage<Props> = () => {
  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="h-screen w-full flex justify-center items-center">
        <button className={buttonStyle}>Make Payment</button>
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
        destination: '//',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
