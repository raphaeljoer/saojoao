import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as styles from './styles';

type Props = {
  title: string;
  subTitle?: string;
  imageUrl: string;
};

export const Perk = ({ title, subTitle, imageUrl }: Props) => {
  return (
    <Stack direction="row" spacing={2} sx={styles.container}>
      <Image src={imageUrl} alt={'cd'} width={60} height={60} />
      <Stack spacing={0.5} sx={styles.content}>
        <Typography variant="body1" sx={styles.title}>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="body2" sx={styles.subTitle}>
            {subTitle}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
