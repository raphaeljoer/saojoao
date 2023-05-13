//material-ui
import { Box } from '@mui/material';
//core-Components
import { Main, Header, Footer } from './components';
//resources
import * as styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Layout({ children }: Props) {
  return (
    <Box sx={styles.container}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  );
}
