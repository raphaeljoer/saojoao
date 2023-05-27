import { Box } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';
import * as styles from './styles';

export function Balloons() {
  const balloonRef = useRef<HTMLDivElement>(null);

  return (
    <Box id="balloons" ref={balloonRef} sx={styles.container}>
      <Box
        className="balloon-item"
        sx={styles.balloon({ delay: 2, duration: 10, zIndex: -2 })}
      >
        <Image src="/assets/balao.svg" alt="Balão" width={80} height={80} />
      </Box>
      <Box
        className="balloon-item"
        sx={styles.balloon({ delay: 2, duration: 10.8 })}
      >
        <Image src="/assets/balao.svg" alt="Balão" width={40} height={40} />
      </Box>
    </Box>
  );
}
