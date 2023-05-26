import { Box } from '@mui/material';
import Image from 'next/image';
import * as styles from './styles';

export function Header() {
  return (
    <Box component="header" sx={styles.container}>
      <Box sx={styles.logoContainer}>
        <Box sx={styles.logo}>
          <Image
            src="/assets/logo-saojoao.svg"
            width={195}
            height={160}
            alt="logo"
            priority
          />
        </Box>
      </Box>
    </Box>
  );
}
