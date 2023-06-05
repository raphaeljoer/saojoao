import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { CustomButton } from '@/modules/2023/shared/components/CustomButton';
import { Spacer } from '@/modules/shared/components/Spacer';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Cover } from '../Cover';
import * as styles from './styles';

type Props = {
  artist: PublicViewArtist;
};

export const ShareArtist = ({ artist }: Props) => {
  const router = useRouter();

  const handleVoteAgain = useCallback(() => {
    router.push('/vote');
  }, [router]);

  const handlePartialResult = useCallback(() => {
    router.push('/result');
  }, [router]);

  return (
    <Box sx={styles.container}>
      <Cover cover={artist.picture} title={artist.name} />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Spacer />
        <Typography
          variant="h2"
          color="secondary.main"
          align="center"
          sx={styles.title}
        >
          {artist.name}
        </Typography>
        <Spacer />
        <Stack spacing={1}>
          <CustomButton onClick={handlePartialResult}>
            {'Ver resultado parcial'}
          </CustomButton>
          <CustomButton onClick={handleVoteAgain}>
            {'Votar novamente'}
          </CustomButton>
        </Stack>
      </Stack>
    </Box>
  );
};
