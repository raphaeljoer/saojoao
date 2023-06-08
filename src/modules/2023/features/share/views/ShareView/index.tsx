import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { useGetArtistQuery } from '@/modules/2023/shared/api/queries/useGetArtistQuery';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Confetti } from '@/modules/shared/components/Confetti';
import { Loading } from '@/modules/shared/components/Loading';
import { Box } from '@mui/material';
import { ShareArtist } from '../../components/ShareArtist';
import * as styles from './styles';

type Props = {
  artist: PublicViewArtist;
};

export const ShareView = ({ artist }: Props) => {
  const { data } = useGetArtistQuery(artist.artistId);

  return (
    <LayoutGrid>
      <Confetti />
      <MetaTags pageName={`Compartilhe para apoiar ${artist.name}`} />
      <Box sx={styles.container}>
        {!data && <Loading />}
        {data && <ShareArtist key={data.artistId} artist={data} />}
      </Box>
    </LayoutGrid>
  );
};
