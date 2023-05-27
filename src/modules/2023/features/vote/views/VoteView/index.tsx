import { useGetArtistsQuery } from '@/modules/2023/shared/api/queries/useGetArtistsQuery';
import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Box } from '@mui/material';
import { VoteArtist } from '../../components/VoteArtist';
import * as styles from './styles';

export const VoteView = () => {
  const { data } = useGetArtistsQuery();

  return (
    <LayoutGrid>
      <MetaTags pageName="Escolha o seu talento" />
      <Balloons />
      <Box id="content" sx={styles.container}>
        {data?.map((artist) => (
          <VoteArtist key={artist.artistId} artist={artist} />
        ))}
      </Box>
    </LayoutGrid>
  );
};
