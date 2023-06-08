import { Box, BoxProps, SxProps, Theme, Typography } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import * as styles from './styles';

type Props = {
  type: Partial<'info' | 'success' | 'warning' | 'error' | 'neutral'>;
  label: string;
  sx?: SxProps<Theme>;
};

export const Tag = forwardRef<BoxProps, Props>(function Tag(
  { type, label, sx, ...props },
  ref
) {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);
  const bgcolor = styles.bg[type];
  const color = styles.color[type];

  return (
    <Box {...props} ref={ref} sx={stylesContainer}>
      <Typography variant="overline" sx={{ ...styles.message, color, bgcolor }}>
        {label}
      </Typography>
    </Box>
  );
});
