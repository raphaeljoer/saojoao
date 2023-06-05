import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { Artist } from '@/modules/2023/shared/components/Artist';
import { Typography } from '@mui/material';
import { useMemo } from 'react';

type Props = {
  artist: PublicViewArtist;
};

export const WinnerArtist = ({ artist }: Props) => {
  const percentage = useMemo(() => {
    return artist.percentage?.toFixed(2);
  }, [artist.percentage]);

  return (
    <Artist artist={artist}>
      <Typography variant="body1" textAlign="center" fontSize={18}>
        {`com ${percentage}% dos votos, ${artist.name} é o Talento de São João 2023 do Sua Música!`}
      </Typography>
    </Artist>
  );
};
