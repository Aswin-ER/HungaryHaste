/* eslint-disable @next/next/no-sync-scripts */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "mobx-react";
import userStoreInstance from "../store/userStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider userStore={userStoreInstance}>
        <Layout>
          <ToastContainer theme="dark" autoClose={3000} />
          <Head>
            <script
              src="https://kit.fontawesome.com/377e6cb833.js"
              crossOrigin="anonymous"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
