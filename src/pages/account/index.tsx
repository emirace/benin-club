import React, { useEffect, useState } from 'react';
import PersonalInfo from '@/sections/PersonalInfo';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

const Account = () => {
  return (
    <div>
      <div className="w-full h-24 bg-black" />
      <div className="mx-auto lg:max-w-7xl px-4 md:px-8 my-10 w-full">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Account;
