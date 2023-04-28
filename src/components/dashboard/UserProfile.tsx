import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { IUser } from '@/models/user.model';
import PersonalInfo from './userProfile/PersonalInfo';
import FinancialInformation from './userProfile/FinancialInformation';

const UserProfile: React.FC<{ user: IUser }> = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="text-base">
      {' '}
      <PersonalInfo user={user} />
      <FinancialInformation user={user} />
    </div>
  );
};

export default UserProfile;
