import { Box } from '@mui/material';

export function FooterOrnament() {
  return (
    <Box
      id="footer-interior"
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
        zIndex: -2
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: -8,
          left: 0,
          right: 0,
          height: 180,
          width: '100%',
          background: 'url(/assets/interior.svg) repeat-x center bottom',
          opacity: 0.7
        }}
      />
    </Box>
  );
}
