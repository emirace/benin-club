import LoginForm from '@/components/LoginForm';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

interface Props {}

const SignIn: React.FC<Props> = () => {
  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <LoginForm />
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
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
