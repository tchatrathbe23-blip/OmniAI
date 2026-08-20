import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OmniText AI — Next-Gen AI Text Studio</title>
        <meta name="description" content="State of the art 3D Glassmorphic AI Text Generator powered by modern LLMs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
