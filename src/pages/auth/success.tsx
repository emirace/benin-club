import RegistrationCompleted from '@/components/RegistrationSuccess';
import { SuccessAnimation } from '@/components/signup/VerificationSuccess';
import { motion } from 'framer-motion';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { IUser } from '@/models/user.model';

interface Props {
  user: IUser;
}
export default function Success({ user }: Props) {
  return (
    <>
      <div className="h-20 w-full bg-black" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center w-full max-w-3xl p-4 mx-4 rounded-lg shadow-lg bg-white">
            <SuccessAnimation />
            <h2 className="mt-4 mb-2 text-2xl font-bold text-center">
              Registration Completed
            </h2>
            <RegistrationCompleted
              name={user.firstName + ' ' + user.surName}
              verificationTime="2 to 3 days"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

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
  console.log(session);

  if (session.user.signupStep !== 'Verification') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};
