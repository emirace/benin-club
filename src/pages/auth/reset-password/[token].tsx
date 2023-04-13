import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User } from '@/models/user.model';
import ResetPasswordForm from '@/components/signup/ResetPasswordForm';

interface Props {
  isValidToken: boolean;
  token: string;
}

export default function ResetPassword({ isValidToken, token }: Props) {
  if (!isValidToken) {
    return <div>Invalid or expired token</div>;
  }

  return <ResetPasswordForm token={token} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { token } = context.query;
  console.log('token', token);

  if (Array.isArray(token)) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (!token) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  try {
    // const user = await User.findOne({
    //   'verificationToken.token': token,
    //   'verificationToken.expires': { $gt: Date.now() },
    // });

    return {
      props: {
        // isValidToken: Boolean(user),
        isValidToken: true,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
};
