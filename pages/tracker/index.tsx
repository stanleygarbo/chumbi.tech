import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import IndexHero from "../../components/tracker/IndexHero";
import { useWallet } from "../../contexts/walletContext";
import { isWalletAddressValid } from "../../util/isWalletAddressValid";

const Tracker: NextPage = () => {
  const router = useRouter();
  const { current } = useWallet();

  useEffect(() => {
    if (current && isWalletAddressValid(current)) {
      router.push(`/tracker/${current}/chumbi`);
    }
  }, [current, router]);

  return (
    <>
      <Head>
        <title>
          Chumbi Tracker for managers and scholars | Chumbi Technologies
        </title>
        <meta
          name="description"
          content="Chumbi Valley tracker for managers and scholars, 
          Staking rewards, Chumbi, fostership earnings, market values, 
          chumbi breeding assistance"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexHero />
    </>
  );
};

export default Tracker;
