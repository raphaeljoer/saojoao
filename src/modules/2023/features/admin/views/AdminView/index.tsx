import { useGetAuditResultQuery } from '@/modules/2023/shared/api/queries/useGetAuditResult';
import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Loading } from '@/modules/shared/components/Loading';
import { Spacer } from '@/modules/shared/components/Spacer';
import { useCallbackDebounce } from '@/modules/shared/hooks/useCallbackDebounce';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { ResultArtist } from '../../components/ResultArtist';
import * as styles from './styles';

export const AdminView = () => {
  const { data: session } = useSession();
  const { data: result, refetch, isRefetching } = useGetAuditResultQuery();

  const totalVotes = useMemo((): string => {
    if (!result) return '0';
    const total = result.reduce((acc, artist) => {
      return acc + Number(artist?.votesCount || 0);
    }, 0);

    return total.toLocaleString('pt-BR');
  }, [result]);

  const handleSignOut = useCallback(async () => {
    await signOut({
      callbackUrl: '/auth/sign-in',
      redirect: true
    });
  }, []);

  const debounceRefetch = useCallbackDebounce(refetch, 250);

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
              fontWeight: 500,
              width: 'fit-content',
              bgcolor: 'primary.main',
              color: 'secondary.dark',
              mx: 'auto',
              boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          />
          <Button size="small" sx={{ fontWeight: 700 }} onClick={handleSignOut}>
            sair
          </Button>
          <Spacer />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h1"
            align="center"
            fontSize={56}
            fontWeight={400}
          >
            {'Resultado'}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Spacer />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(152, 1, 69, 0.3)',
                border: '1px solid rgba(152, 1, 69, 0.1)',
                pr: 2,
                borderRadius: 4
              }}
            >
              <Chip
                label="Total de votos"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'secondary.dark',
                  fontWeight: 500
                }}
              />
              {hasResult && (
                <Typography variant="body2" color="white" fontWeight={500}>
                  {totalVotes}
                </Typography>
              )}
            </Stack>
            <Tooltip title="Atualizar">
              <span>
                <IconButton
                  size="small"
                  onClick={debounceRefetch}
                  disabled={isRefetching}
                >
                  {isRefetching ? (
                    <Box sx={{ width: 20, height: 20 }}>
                      <Loading size={14} />
                    </Box>
                  ) : (
                    <ArrowCounterClockwise color="#FFC014" size={20} />
                  )}
                </IconButton>
              </span>
            </Tooltip>
            <Spacer />
          </Stack>
        </Stack>
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
