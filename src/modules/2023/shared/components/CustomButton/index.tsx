import { Button, ButtonProps } from '@mui/material';
import * as styles from './styles';

export const CustomButton = (props: ButtonProps) => {
  const buttonStyles = { ...styles.button, ...props.sx };

  return (
    <Button {...props} size="large" variant="contained" sx={buttonStyles} />
  );
};
