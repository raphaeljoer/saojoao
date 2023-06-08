import { FloatingSVGComponent } from '@/modules/2023/shared/components/FloatingSVGComponent';
import { FooterOrnament } from '@/modules/2023/shared/components/FooterOrnament';
import { theme } from '@/modules/2023/theme';
import { GoogleRecaptchaV3 } from '@/modules/shared/components/GoogleRecaptchaV3';
import { GoogleTagManager } from '@/modules/shared/components/GoogleTagManager';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../app/styles/global.css';
import '../app/styles/nprogress.css';
import '../app/styles/toast.css';
import { cache } from './_document';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 1 // 1 hour
    }
  }
});

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  nProgress.configure({
    minimum: 0.2,
    showSpinner: false,
    speed: 1500
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            progressClassName="toast-progress"
          />
          <SessionProvider session={session}>
            <Component {...pageProps} />
            <Analytics />
          </SessionProvider>
          <GoogleTagManager
            id={process.env.NEXT_PUBLIC_SM_GOOGLE_TAG_MANAGER_ID || ''}
          />
          <GoogleRecaptchaV3
            siteKey={process.env.SM_RECAPTCHA_V3_SITE_KEY || ''}
          />
          <FloatingSVGComponent />
          <FooterOrnament />
          <ToastContainer />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
