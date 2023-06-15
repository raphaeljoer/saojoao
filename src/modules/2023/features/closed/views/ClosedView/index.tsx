import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Countdown } from '@/modules/shared/components/CountDown';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import * as styles from './styles';

export const ClosedView = () => {
  const router = useRouter();
  const handleRedirect = useCallback(() => {
    router.push('/winner');
  }, [router]);

  return (
    <LayoutGrid>
      <MetaTags pageName="Votação encerrada" />
      <Balloons />
      <Stack spacing={2} sx={styles.container}>
        <Typography variant="h2" textAlign="center" lineHeight={0.8}>
          {'Votação encerrada'}
        </Typography>
        <Typography variant="h4" textAlign="center">
          <Countdown
            prefix="Falta"
            targetTime={new Date(process.env.VOTING_RELEASE_WINNER_DATE || '')}
            suffix="para o resultado final"
            onOver={handleRedirect}
          />
        </Typography>
      </Stack>
    </LayoutGrid>
  );
};
