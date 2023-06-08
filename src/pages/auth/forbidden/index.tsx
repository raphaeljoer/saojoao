import { ForbiddenView } from '@/modules/2023/features/auth/modules/forbidden/views/ForbiddenView';
import { GetServerSideProps, NextPage } from 'next';

const ForbiddenPage: NextPage = () => {
  return <ForbiddenView />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  };
};

export default ForbiddenPage;
