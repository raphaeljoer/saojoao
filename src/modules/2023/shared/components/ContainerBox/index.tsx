import { Grid, Stack } from '@mui/material';
import { ReactNode } from 'react';
import * as styles from './styles';

type Props = {
  children: ReactNode;
};

export const ContainerBox = ({ children }: Props) => {
  return (
    <Grid item sx={styles.container}>
      <Stack sx={{ width: '100%', flexGrow: 1 }}>{children}</Stack>
    </Grid>
  );
};
