import { AuditViewArtist } from '@/core/server/domain/entities/artist';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Cover } from '../Cover';
import { Position } from '../Position';
import { ProgressBar } from '../ProgressBar';
import * as styles from './styles';

type Props = {
  artist: AuditViewArtist;
};

export const ResultArtist = ({ artist }: Props) => {
  return (
    <Box component="article" sx={styles.item}>
      <Box sx={{ position: 'relative' }}>
        <Position position={artist.position || 0} />
        <Cover cover={artist.picture} title={artist.name} />
      </Box>
      <Stack id="content" spacing={0.5} sx={styles.content}>
        <Typography variant="h2" sx={styles.artist}>
          {artist.name}
        </Typography>
        <ProgressBar
          progress={artist.progress || 0}
          percentage={artist.percentage || 0}
        />
        <Stack direction="row">
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
              label="Votos"
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'secondary.dark',
                fontWeight: 500
              }}
            />
            <Typography variant="body2" color="white" fontWeight={500}>
              {artist.votesCount?.toLocaleString('pt-BR') || 0}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
