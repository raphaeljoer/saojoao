import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Confetti } from '@/modules/shared/components/Confetti';
import { Box } from '@mui/material';
import { WinnerArtist } from '../../components/WinnerArtist';
import * as styles from './styles';

type Props = {
  artists: PublicViewArtist[];
};

export const WinnerView = ({ artists }: Props) => {
  return (
    <LayoutGrid>
      <Confetti />
      <MetaTags
        pageName={`${artists[0].name} é o grande vencedor do Talento São João 2023`}
      />
      <Box sx={styles.container}>
        <WinnerArtist artist={artists[0]} />
      </Box>
    </LayoutGrid>
  );
};
