import Loading from '@/components/Loading';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { IUser } from '@/models/user.model';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }
  if (!session) {
    router.replace('/auth/signin');
    return null;
  }

  const { user } = session;
  return (
    <div>
      <div className="h-24 w-full bg-black" />
      <DashboardLayout user={user} />
    </div>
  );
};

export default Dashboard;
