//material-ui
import { Grid } from '@mui/material';
//core-Components
import { Footer, Header } from './components';
//resources
import * as styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function LayoutGrid({ children }: Props) {
  return (
    <Grid container sx={styles.container}>
      <Header />
      {children}
      <Footer />
    </Grid>
  );
}
