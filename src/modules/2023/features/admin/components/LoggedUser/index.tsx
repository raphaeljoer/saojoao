import { Avatar, Button, Chip, Stack } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import * as styles from './styles';

export const LoggedUser = () => {
  const { data: session } = useSession();

  const handleSignOut = useCallback(async () => {
    await signOut({
      callbackUrl: '/auth/sign-in',
      redirect: true
    });
  }, []);

  return (
    <Stack direction="column" spacing={0.5} sx={styles.container}>
      <Chip
        avatar={
          <Avatar
            alt={session?.user?.name || ''}
            src={session?.user?.image || ''}
          />
        }
        label={session?.user?.name || ''}
        variant="filled"
        sx={styles.avatar}
      />
      <Button size="small" onClick={handleSignOut} sx={styles.button}>
        {'Sair'}
      </Button>
    </Stack>
  );
};
