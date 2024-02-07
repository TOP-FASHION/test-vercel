import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Appsignal from "@appsignal/javascript"

new Appsignal({ key: "60967553-132c-49fd-ade4-319012762c85" })

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </>
  );
}
