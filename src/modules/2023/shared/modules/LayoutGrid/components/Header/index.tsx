import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './styles';

export function Header() {
  return (
    <Box component="header" sx={styles.container}>
      <Link href="/">
        <Image
          src="/assets/logo-saojoao.svg"
          width={198}
          height={180}
          alt="logo"
          priority
        />
      </Link>
    </Box>
  );
}
