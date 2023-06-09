import {
  Box,
  CircularProgress,
  CircularProgressProps,
  SxProps,
  Typography
} from '@mui/material';
import nProgress from 'nprogress';
import { useEffect, useMemo } from 'react';
import * as styles from './styles';

type Props = {
  title?: string;
  sx?: SxProps;
  circularProgressProps?: CircularProgressProps;
  size?: number;
};

export const Loading = ({
  title,
  size = 24,
  sx,
  circularProgressProps
}: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
    };
  }, []);

  return (
    <Box sx={stylesContainer}>
      <CircularProgress
        color="primary"
        size={size}
        thickness={4}
        {...circularProgressProps}
      />
      {title && (
        <Typography color="text.secondary" textAlign="center">
          {title}
        </Typography>
      )}
    </Box>
  );
};
