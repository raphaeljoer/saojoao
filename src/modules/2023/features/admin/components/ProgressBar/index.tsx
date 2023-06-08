import { numI18n } from '@/modules/shared/utils/number/numI18n';
import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  progress: number;
  percentage: number;
};

export const ProgressBar = ({ progress, percentage }: Props) => {
  const percent = numI18n({ value: percentage }).slice(0, 4);

  return (
    <Box sx={styles.container}>
      <Box id="bar" sx={styles.progress}>
        <Box id="progress" sx={styles.bar} width={`${progress}%`}></Box>
      </Box>
      <Typography variant="body2" sx={styles.percent}>
        {`${percent}%`}
      </Typography>
    </Box>
  );
};
