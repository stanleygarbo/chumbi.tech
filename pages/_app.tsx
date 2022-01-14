import type { AppProps } from "next/app";
import AllContextProviders from "../contexts";
import { Layout } from "../templates/Layout";
import NextNprogress from "nextjs-progressbar";
import { colors } from "../theme/colors";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllContextProviders>
      <Layout>
        <NextNprogress
          color={colors.darkMode.accent}
          startPosition={0.3}
          stopDelayMs={200}
          height={1}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </AllContextProviders>
  );
}

export default MyApp;
