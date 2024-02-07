import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import zipy from 'zipyai';

zipy.init('71290866');

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </>
  );
}
