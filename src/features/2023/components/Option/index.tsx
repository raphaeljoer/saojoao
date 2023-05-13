import { Spacer } from '@/features/shared/components/Spacer';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Cover } from '../Cover';
import * as styles from './styles';

type HandleVote = MouseEventHandler<HTMLButtonElement>;

export const Option = () => {
  const [clicked, setClicked] = useState(false);
  
  const handleRecaptcha = (response: any) => {
    console.log('Resposta do reCAPTCHA:', response);
  };

  const handleClick = () => {
    setClicked(true);
  }
  
  return (
    <Grid item sx={styles.container}>
      <Cover cover="/dede" title={"01"} />
      <Stack sx={{ width: '100%', flexGrow: 1 }}>
        <Typography
          variant="h2"
          color="secondary.main"
          align="center"
          sx={styles.title}
        >
          {'title'}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          align="center"
          sx={styles.description}
        >
          {'description'}
        </Typography>
        <Spacer />
        {!clicked && (
          <Button
            color="primary"
            size="large" 
            variant="contained"
            onClick={handleClick}
            sx={styles.button}
            >
            {'votar'}
          </Button>
        )}
        {clicked && (
          <ReCAPTCHA
            sitekey="6Le2pggmAAAAAM1OR_7qOs-1LJ1LaXsJe4G45sAy"
            onChange={handleRecaptcha}
          />
        )}
      </Stack>
    </Grid>
  );
};
