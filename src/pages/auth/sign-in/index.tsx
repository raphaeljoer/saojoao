import { SignInView } from '@/modules/2023/features/auth/modules/sign-in';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

const SignInPage: NextPage = () => {
  return <SignInView />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default SignInPage;
