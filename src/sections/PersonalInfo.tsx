import ActivityHistory from '@/components/ActivityHistory';
import MemberDetails from '@/components/MemberDetails';
import SocialMedia from '@/components/SocialMedia';
import { activities } from '@/constants/activities';
import { membership } from '@/constants/membership';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWallet } from 'react-icons/fa';
import PrivacySettings from './PrivacySettings';

interface MembershipProfile {
  name: string;
  membershipType: string;
  membershipStatus: string;
  location: string;
  bio: string;
  imageUrl: string;
  walletAmount: number;
}

const membershipProfile: MembershipProfile = {
  name: 'Jane Smith',
  membershipType: 'Gold',
  membershipStatus: 'Active',
  location: 'Los Angeles',
  bio: 'I love playing tennis and meeting new people!',
  imageUrl: '/images/image3.jpg',
  walletAmount: 500,
};

export default function PersonalInfo() {
  return (
    <div className="flex flex-col md:flex-row bg-white ">
      {/* Left Column */}
      <div className="relative flex flex-col items-center  md:w-1/3 py-8">
        <Image
          src={membershipProfile.imageUrl}
          alt={membershipProfile.name}
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold mt-4 uppercase">
          {membershipProfile.name}
        </h1>
        <h2 className="text-sm font-bold text-red">
          {membershipProfile.membershipType} Member
        </h2>
        {/* Contact Button */}
        <button className="bg-white text-red py-2 px-4 rounded-md shadow-md hover:bg-red hover:text-white transition duration-300 ease-in-out mb-4">
          Contact Member
        </button>
        <p className="text-sm text-center px-4 mt-4">{membershipProfile.bio}</p>
        <SocialMedia
          facebook="https://www.facebook.com/johndoe"
          twitter="https://twitter.com/johndoe"
          instagram="https://www.instagram.com/johndoe"
          linkedin="https://www.linkedin.com/in/johndoe"
        />
      </div>
      {/* Right Column */}
      <div className="flex flex-col md:w-2/3 py-8 px-8">
        {/* <Head>
          <title>{membershipProfile.name} | Club Membership Profile</title>
        </Head> */}

        {/* Personal Info */}
        <div className="mb-4 hidden md:block">
          <h1 className="text-2xl font-bold mt-4">{membershipProfile.name}</h1>
          <h2 className="text-sm font-bold text-red">
            {membershipProfile.membershipType} Member
          </h2>
        </div>
        <div className="flex items-center mb-4">
          <FaPhone className="mr-2" />
          <p>123-456-7890</p>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2" />
          <p>janesmith@example.com</p>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <p>{membershipProfile.location}</p>
        </div>

        {/* Wallet Section */}
        <div className="flex items-center mb-4">
          <FaWallet className="mr-2" />
          <p>
            Wallet Balance:
            <span className="text-red">N{membershipProfile.walletAmount}</span>
          </p>
        </div>

        <MemberDetails membership={membership} />
        <ActivityHistory activities={activities} />
        <PrivacySettings />
      </div>
    </div>
  );
}
