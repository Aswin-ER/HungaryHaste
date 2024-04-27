/* eslint-disable @next/next/no-sync-scripts */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
        <script src="https://kit.fontawesome.com/377e6cb833.js" crossOrigin="anonymous" />
      </Head>
  <Component {...pageProps} />
    </>
  );
}
