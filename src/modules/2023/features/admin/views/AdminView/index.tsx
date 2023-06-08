import { useGetAuditResultQuery } from '@/modules/2023/shared/api/queries/useGetAuditResult';
import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Loading } from '@/modules/shared/components/Loading';
import { Spacer } from '@/modules/shared/components/Spacer';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { ResultArtist } from '../../components/ResultArtist';
import * as styles from './styles';

export const AdminView = () => {
  const { data: session } = useSession();
  const { data: result } = useGetAuditResultQuery();

  const handleSignOut = useCallback(async () => {
    await signOut({
      callbackUrl: '/auth/sign-in',
      redirect: true
    });
  }, []);

  const hasResult = result && result.length > 0;

  return (
    <LayoutGrid>
      <MetaTags pageName="Resultado" />
      <Balloons />
      <Stack spacing={3} sx={styles.container}>
        <Stack
          direction="column"
          spacing={0.5}
          sx={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spacer />
          <Chip
            avatar={
              <Avatar
                alt={session?.user?.name || ''}
                src={session?.user?.image || ''}
              />
            }
            label={session?.user?.name || ''}
            variant="filled"
            sx={{
              width: 'fit-content',
              bgcolor: 'primary.main',
              color: 'secondary.dark',
              mx: 'auto'
            }}
          />
          <Button size="small" onClick={handleSignOut}>
            sair
          </Button>
          <Spacer />
        </Stack>
        <Typography variant="h1" align="center" fontSize={56} fontWeight={400}>
          {'Resultado'}
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          {!hasResult && <Loading />}
          {hasResult &&
            result.map((artist) => (
              <ResultArtist key={artist.artistId} artist={artist} />
            ))}
        </Stack>
      </Stack>
    </LayoutGrid>
  );
};
