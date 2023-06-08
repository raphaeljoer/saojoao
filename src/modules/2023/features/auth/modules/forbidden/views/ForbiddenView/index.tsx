import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { ContainerBox } from '@/modules/2023/shared/components/ContainerBox';
import { CustomButton } from '@/modules/2023/shared/components/CustomButton';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Spacer } from '@/modules/shared/components/Spacer';
import { Stack } from '@mui/material';
import { Fingerprint, GoogleLogo } from '@phosphor-icons/react';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export const ForbiddenView = () => {
  const handleSignIn = useCallback(async () => {
    await signIn('google');
  }, []);

  return (
    <LayoutGrid>
      <MetaTags pageName="Admin" />
      <Balloons />
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <ContainerBox>
          <Spacer />
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Fingerprint size={56} />
          </Stack>
          <Spacer />
          <CustomButton onClick={handleSignIn}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <GoogleLogo size={20} />
              <span>Sign in with Google</span>
            </Stack>
          </CustomButton>
        </ContainerBox>
      </Stack>
    </LayoutGrid>
  );
};
