import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { CustomButton } from '@/modules/2023/shared/components/CustomButton';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Countdown } from '@/modules/shared/components/CountDown';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Perk } from '../../components/Perk';
import * as styles from './styles';

export const PerksView = () => {
  const router = useRouter();

  return (
    <LayoutGrid>
      <MetaTags pageName="Premiação" />
      <Balloons />
      <Stack spacing={4} sx={styles.container}>
        <Stack spacing={2}>
          <Typography variant="h2" sx={styles.title}>
            {'Iniciamos a busca por mais um talento nesse São João'}
          </Typography>
          <Typography variant="h3" sx={styles.subTitle}>
            {'Premiação:'}
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Perk
            imageUrl="/assets/monitor-play.svg"
            title="1 CD e 1 videoclipe"
            subTitle="(Produzidos e distribuídos pelo Sua Música Digital)"
          />
          <Perk
            imageUrl="/assets/suamusica-symbol.svg"
            title="R$ 20 mil"
            subTitle="(em mídia no Sua Música)"
          />
          <Perk
            imageUrl="/assets/kwai-symbol.svg"
            title="R$ 20 mil"
            subTitle="(em mídia no Kwai)"
          />
          <Perk imageUrl="/assets/trophy.svg" title="Troféu personalizado" />
        </Stack>
        <Typography variant="h5" textAlign="center">
          <Countdown
            prefix="Em:"
            targetTime={new Date(process.env.VOTING_DATE_START || '')}
            suffix="começa a votação"
          />
        </Typography>
        <CustomButton
          sx={{ maxWidth: 420 }}
          onClick={() => router.push('/rules')}
        >
          {'Consulte o regulamento'}
        </CustomButton>
      </Stack>
    </LayoutGrid>
  );
};
