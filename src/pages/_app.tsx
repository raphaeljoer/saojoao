import { FloatingSVGComponent } from '@/modules/2023/shared/components/FloatingSVGComponent';
import { theme } from '@/modules/2023/theme';
import { Fonts } from '@/modules/shared/components/Fonts';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import { Odibee_Sans } from 'next/font/google';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../app/styles/global.css';
import '../app/styles/nprogress.css';
import '../app/styles/toast.css';
import { cache } from './_document';

const odibeeSans = Odibee_Sans({ weight: "400", subsets: ["latin"] });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 1 // 12 hours
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
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
            <Fonts fonts={[odibeeSans]}>
              <Component {...pageProps} />
            </Fonts>
            <FloatingSVGComponent />
          <ToastContainer />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
