import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import IndexHero from "../../components/tracker/IndexHero";
import { useWallet } from "../../contexts/walletContext";

const Tracker: NextPage = () => {
  const router = useRouter();
  const { current } = useWallet();

  useEffect(() => {
    if (current) {
      router.push("/tracker/chumbi");
    }
  }, [current, router]);

  return (
    <>
      <IndexHero />
    </>
  );
};

export default Tracker;
