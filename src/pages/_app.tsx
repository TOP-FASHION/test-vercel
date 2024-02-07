import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import * as atatus from 'atatus-spa';

atatus.config('6bd87624839d43bd9124a7d5a13a0725').install();

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </>
  );
}
