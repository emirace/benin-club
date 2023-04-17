import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IUser } from '@/models/user.model';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { buttonStyleOutline, buttonStyleW } from '@/constants/styles';

interface Props {
  user: IUser;
}

const Dropdown = (User: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = User;
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer" onClick={handleToggle}>
        <button className="h-14 w-14">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.firstName || 'profile image'}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/images/profile.webp"
              alt="profile image"
              fill
              className="rounded-full object-cover"
            />
          )}
        </button>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-16 mt-2 py-2 w-48 bg-black rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ml-2 py-2 font-bold text-red">
              Welcome, {user.firstName}!
            </div>

            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-white hover:bg-pink capitalize font-bold"
            >
              Profile
            </Link>
            <Link
              href="/account/activities"
              className="block px-4 py-2 text-sm text-white hover:bg-pink capitalize font-bold"
            >
              Activities
            </Link>
            <Link
              href="/account/settings"
              className="block px-4 py-2 text-sm text-white hover:bg-pink capitalize font-bold"
            >
              Settings
            </Link>
            <div className="w-full pt-4 pb-2 flex items-center justify-center">
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className={`${buttonStyleOutline} `}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
