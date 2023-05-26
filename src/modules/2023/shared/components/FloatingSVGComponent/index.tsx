import { Box } from '@mui/material';
import Image from 'next/image';

export function FloatingSVGComponent() {
  return (
    <Box
      sx={{
        display: { md: 'flex', xs: 'none' },
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        pointerEvents: 'none',
        alignItems: 'flex-start',
        padding: 6,
        maxWidth: 1920,
        mx: 'auto',
        zIndex: -1
      }}
    >
      <Box
        className="floating-item"
        sx={{ position: 'absolute', top: 80, left: 80 }}
      >
        <Image src="/assets/balao.svg" alt="Balão" width={160} height={160} />
      </Box>
      <Box
        className="floating-item"
        sx={{ position: 'absolute', bottom: 80, right: 60 }}
      >
        <Image src="/assets/chapeu.svg" alt="Chapéu" width={80} height={80} />
      </Box>
      <Box
        className="floating-item-2"
        sx={{ position: 'absolute', top: 80, right: 120 }}
      >
        <Image
          src="/assets/bandeira.svg"
          alt="Bandeira"
          width={180}
          height={180}
        />
      </Box>
      <Box
        className="floating-item-2"
        sx={{ position: 'absolute', bottom: 120, left: 88 }}
      >
        <Image src="/assets/lua.svg" alt="Bandeira" width={80} height={80} />
      </Box>
    </Box>
  );
}
