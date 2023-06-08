import { AdminView } from '@/modules/2023/features/admin';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

const AdminPage: NextPage = () => {
  return <AdminView />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false
      }
    };
  }

  const users = process.env.SM_USERS_LIST?.split(',') || [];

  if (!users.includes(session?.user?.email || '')) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default AdminPage;
