import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type PositionProps = {
  position: number;
};

export const Position = ({ position }: PositionProps) => {
  return (
    <Box sx={styles.container}>
      <Typography
        variant="body2"
        color="secondary.dark"
        fontWeight={700}
        sx={{ ml: 0.5 }}
      >
        {`${position}°`}
      </Typography>
    </Box>
  );
};
