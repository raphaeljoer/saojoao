import { Box } from '@mui/material';

export const GranulatedOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, rgba(0,0,0,0.01) 1%, transparent 100%), radial-gradient(circle, rgba(0,0,0,0.01) 1%, black 100%)`,
        backgroundSize: '4px 4px',
        opacity: 0.6,
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        pointerEvents: 'none'
      }}
    />
  );
};
