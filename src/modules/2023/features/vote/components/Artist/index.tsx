import { Artist as ArtistEntity } from '@/core/shared/domain/entities/artist';
import { useAddVoteMutation } from '@/modules/2023/shared/api/mutations/useAddVoteMutation';
import { CustomButton } from '@/modules/2023/shared/components/CustomButton';
import { Loading } from '@/modules/shared/components/Loading';
import { Spacer } from '@/modules/shared/components/Spacer';
import { Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { Cover } from '../Cover';
import * as styles from './styles';

type Props = {
  artist: ArtistEntity;
}

export const Artist = ({ artist }: Props) => {
  const router = useRouter();
  const addVoteMutation = useAddVoteMutation();
  const [openRecaptchaChallenge, setOpenRecaptchaChallenge] = useState(false);
  
  const handleRecaptcha = useCallback((token: any) => {
    addVoteMutation.mutate({ artistId: artist.artistId, recaptchaToken: token });
    setOpenRecaptchaChallenge(false);
  }, [artist.artistId, addVoteMutation]);

  const handleClick = useCallback(() => {
    setOpenRecaptchaChallenge(true);
  }, [])

  if(addVoteMutation.isSuccess) {
    toast(`Você votou em ${artist.name}!`);
    router.push(`/share/${artist.slug}`);
  }

  if(addVoteMutation.isError) {
    toast(`Não foi possível registrar o seu voto`);
  }
  
  return (
    <Grid item sx={styles.container}>
      <Cover cover={artist.picture} title={artist.name} />
      <Stack sx={{ width: '100%', flexGrow: 1 }}>
        <Spacer />
          <Typography
            variant="h2"
            align="center"
            sx={styles.title}
            >
            {artist.name}
          </Typography>
        <Spacer />
        {!openRecaptchaChallenge && (
          <CustomButton onClick={handleClick} disabled={addVoteMutation.isLoading || addVoteMutation.isSuccess}>
            {(addVoteMutation.isLoading || addVoteMutation.isSuccess) ? <Loading circularProgressProps={{
              color: "primary",
              size: 24,
              thickness: 4
            }}/> : 'votar'}
          </CustomButton>
        )}
        {openRecaptchaChallenge && (
          <ReCAPTCHA
            sitekey={process.env.SM_RECAPTCHA_V2_SITE_KEY || ''}
            onChange={handleRecaptcha}
          />
        )}
      </Stack>
    </Grid>
  );
};
