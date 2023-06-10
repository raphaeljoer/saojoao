import { useGetAuditResultQuery } from '@/modules/2023/shared/api/queries/useGetAuditResult';
import { Spacer } from '@/modules/shared/components/Spacer';
import { useCallbackDebounce } from '@/modules/shared/hooks/useCallbackDebounce';
import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Info } from '../Info';
import { LoggedUser } from '../LoggedUser';
import { RefreshButton } from '../RefreshButton';

export const AdminHeader = () => {
  const { data: result, refetch, isRefetching } = useGetAuditResultQuery();

  const totalVotes = useMemo((): string => {
    if (!result) return '0';
    const total = result.reduce((acc, artist) => {
      return acc + Number(artist?.votesCount || 0);
    }, 0);

    return total.toLocaleString('pt-BR');
  }, [result]);

  const debounceRefetch = useCallbackDebounce(refetch, 250);

  return (
    <>
      <LoggedUser />
      <Stack spacing={1}>
        <Typography variant="h1" align="center" fontSize={56} fontWeight={400}>
          {'Resultado'}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Spacer />
          <Info title="Total de votos" value={totalVotes} />
          <RefreshButton
            title="Atualizar"
            onClick={debounceRefetch}
            isLoading={isRefetching}
          />
          <Spacer />
        </Stack>
      </Stack>
    </>
  );
};
