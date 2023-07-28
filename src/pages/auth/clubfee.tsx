import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { IUser } from '@/models/user.model';

interface ClubFeeProps {
  user: IUser;
}

const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

const ClubFee: NextPage<ClubFeeProps> = ({ user }) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const config = {
    public_key: apiKey || 'try',
    tx_ref: generateID(),
    amount: user.entryFeePayment,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: `${user.tel}`,
      name: user.surName + ' ' + user.firstName,
    },
    customizations: {
      title: 'Benin Club 1931',
      description: 'Entry fee payment',
      logo: 'https://www.beninclub1931.com//api/images/image1690495346262.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSbmit = async (transactionId: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/payment', {
        method: 'POST',
        body: JSON.stringify({ transactionId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        await update({ signupStep: 'Completed' });
        console.log(response);
        router.push('/account');
        setLoading(false);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setLoading(false);
      }
    } catch (error) {
      setError('Something went wrong, pls try again later');
      console.log(error);
      setLoading(false);
    }
  };

  function generateID() {
    return (
      'BENCLUB_tx_ref_' +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2)
    );
    // e.g. 'TRXkqjw1i7z6w29k3zqx8'
  }

  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        {/* <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red to-pink text-white"> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaCheckCircle className="text-6xl mb-4" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold mb-8"
        >
          Congratulations!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mb-6 text-center max-w-md"
        >
          Your profile has been verified by the admin. You can now proceed to
          pay the membership fee to become an official member of our club.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-4 px-8 bg-red text-white font-bold rounded-lg shadow-md hover:bg-white hover:text-red  transition-colors duration-300"
          onClick={() =>
            handleFlutterPayment({
              callback: async (response) => {
                console.log(response);
                if (
                  response.status === 'completed' ||
                  response.status === 'successful'
                ) {
                  closePaymentModal(); // this will close the modal programmatically
                  await handleSbmit(response.transaction_id);
                }
              },
              onClose: () => {},
            })
          }
        >
          Pay Membership Fee
        </motion.button>
      </div>
    </>
  );
};

export default ClubFee;

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

  if (session.user.signupStep !== 'ClubPayment') {
    return {
      redirect: {
        destination: '/about',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};
