import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { Spacer } from '@/modules/shared/components/Spacer';
import { Grid, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Cover } from '../Cover';
import * as styles from './styles';

type Props = {
  artist: PublicViewArtist;
  children: ReactNode;
};

export const Artist = ({ artist, children }: Props) => {
  return (
    <Grid item sx={styles.container}>
      <Cover cover={artist.picture} title={artist.name} />
      <Stack sx={{ width: '100%', flexGrow: 1 }}>
        <Spacer />
        <Typography variant="h2" align="center" sx={styles.title}>
          {artist.name}
        </Typography>
        <Spacer />
        {children}
      </Stack>
    </Grid>
  );
};
