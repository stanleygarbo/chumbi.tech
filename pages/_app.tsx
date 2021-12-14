import type { AppProps } from "next/app";
import AllContextProviders from "../contexts";
import { Layout } from "../templates/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllContextProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AllContextProviders>
  );
}

export default MyApp;
