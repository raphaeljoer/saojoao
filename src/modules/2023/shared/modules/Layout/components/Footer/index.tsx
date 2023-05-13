import { Box } from '@mui/material';
import Image from 'next/image';
import * as styles from './styles';

export function Footer() {
  return (
    <Box component="footer" sx={styles.container}>
      <Image
        src="/assets/boticario.svg"
        width={238}
        height={80}
        alt="Grupo Boticário"
      />
    </Box>
  );
}
