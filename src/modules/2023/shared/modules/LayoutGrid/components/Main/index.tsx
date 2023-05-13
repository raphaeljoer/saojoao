//material-ui
import { Box } from '@mui/material';
//resources
import React from 'react';
//styles
import * as styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Main({ children }: Props) {
  return (
    <Box component="main" sx={styles.container}>
      {children}
    </Box>
  );
}
