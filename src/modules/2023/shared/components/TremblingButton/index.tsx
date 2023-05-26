import { Button, ButtonProps } from '@mui/material';
import * as styles from './styles';

export const TremblingButton = (props: ButtonProps) => {
  return (
    <Button {...props} size="large" variant="contained" sx={styles.button} />
  );
};
