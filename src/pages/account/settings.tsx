import React from 'react';
import PersonalInfo from '@/sections/PersonalInfo';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { IUser } from '@/models/user.model';
import PrivacySettingsSection from '@/sections/PrivacySettings';

interface SettingProps {
  user: IUser;
}

const Setting: React.FC<SettingProps> = ({ user }) => {
  return (
    <div>
      <div className="w-full h-24 bg-black" />
      <div className="mx-auto lg:max-w-7xl px-4 md:px-8  w-full">
        <PrivacySettingsSection />
      </div>
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

export default Setting;
