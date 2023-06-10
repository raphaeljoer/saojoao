import { Loading } from '@/modules/shared/components/Loading';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ArrowCounterClockwise } from '@phosphor-icons/react';

type Props = {
  title?: string;
  onClick: () => void;
  isLoading: boolean;
};

export const RefreshButton = ({ title, onClick, isLoading }: Props) => {
  return (
    <Tooltip title={title} sx={{ bgcolor: 'secondary.main' }}>
      <span>
        <IconButton size="small" onClick={onClick} disabled={isLoading}>
          {isLoading ? (
            <Box sx={{ width: 20, height: 20 }}>
              <Loading size={14} />
            </Box>
          ) : (
            <ArrowCounterClockwise color="#FFC014" size={20} weight="bold" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
