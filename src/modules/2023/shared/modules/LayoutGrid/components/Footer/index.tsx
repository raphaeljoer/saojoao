import { Box } from '@mui/material';
import Image from 'next/image';
import * as styles from './styles';

export function Footer() {
  return (
    <Box component="footer" sx={styles.container}>
      <Box sx={styles.logoContainer}>
        <Image
          src="/assets/logo-kwai-light.svg"
          width={193}
          height={32}
          alt="Kwai"
        />
      </Box>
    </Box>
  );
}
