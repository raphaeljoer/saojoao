import { Chip, Skeleton, Stack, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  value: string;
};

export const Info = ({ title, value }: Props) => {
  return (
    <Stack direction="row" spacing={1} sx={styles.container}>
      <Chip label={title} size="small" sx={styles.tag} />
      {value && (
        <Typography variant="body2" color="white" fontWeight={500}>
          {value}
        </Typography>
      )}
      {!value && <Skeleton />}
    </Stack>
  );
};
