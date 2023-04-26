import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { IUser } from '@/models/user.model';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

interface DashboardProps {
  user: IUser;
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  return (
    <div>
      <div className="h-24 w-full bg-black" />
      <DashboardLayout user={user} />
    </div>
  );
};

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

  return {
    props: { user: session.user },
  };
};

export default Dashboard;
