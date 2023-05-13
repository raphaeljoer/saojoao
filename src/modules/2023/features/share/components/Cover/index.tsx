import { Box } from '@mui/material';
import Image from 'next/image';
import * as styles from './styles';

type Props = {
  cover: string;
  title: string;
};

const pixelBase64 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export const Cover = ({ cover, title }: Props) => {
  return (
    <Box sx={styles.cover}>
      <Image
        placeholder="blur"
        blurDataURL={pixelBase64}
        src={cover}
        alt={title}
        width={160}
        height={160}
      />
    </Box>
  );
};
