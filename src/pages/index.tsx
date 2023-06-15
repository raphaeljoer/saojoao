import { GetServerSideProps, NextPage } from 'next';
import PerksPage from './perks';

const HomePage: NextPage = () => {
  return <PerksPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const now = new Date().getTime();
  const votingStartDate = new Date(process.env.VOTING_DATE_START || '').getTime(); //prettier-ignore
  const votingEndDate = new Date(process.env.VOTING_DATE_END || '').getTime(); //prettier-ignore
  const releaseWinnerDate = new Date(process.env.VOTING_RELEASE_WINNER_DATE || '').getTime(); //prettier-ignore

  if (now < votingStartDate) {
    return {
      redirect: {
        destination: '/perks',
        permanent: false
      }
    };
  }

  if (now > votingStartDate && now < votingEndDate) {
    return {
      redirect: {
        destination: '/vote',
        permanent: false
      }
    };
  }

  if (now > votingEndDate && now < releaseWinnerDate) {
    return {
      redirect: {
        destination: '/closed',
        permanent: false
      }
    };
  }

  if (now > releaseWinnerDate) {
    return {
      redirect: {
        destination: '/winner',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default HomePage;
