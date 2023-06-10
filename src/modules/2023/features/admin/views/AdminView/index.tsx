import { useGetAuditResultQuery } from '@/modules/2023/shared/api/queries/useGetAuditResult';
import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Loading } from '@/modules/shared/components/Loading';
import { Box, Stack } from '@mui/material';
import { useMemo } from 'react';
import { AdminHeader } from '../../components/AdminHeader';
import { ResultArtist } from '../../components/ResultArtist';
import * as styles from './styles';

export const AdminView = () => {
  const { data: result } = useGetAuditResultQuery();
  const hasResult = result && result.length > 0;

  const display = useMemo(() => {
    if (!hasResult) {
      return (
        <Box sx={styles.noResult}>
          <Loading size={40} />
        </Box>
      );
    }

    return result.map((artist) => (
      <ResultArtist key={artist.artistId} artist={artist} />
    ));
  }, [hasResult, result]);

  return (
    <LayoutGrid>
      <MetaTags pageName="Resultado" />
      <Balloons />
      <Stack component="main" spacing={3} sx={styles.container}>
        <AdminHeader />
        <Stack
          component="section"
          spacing={2}
          sx={{ width: '100%', height: '100%' }}
        >
          {display}
        </Stack>
      </Stack>
    </LayoutGrid>
  );
};
