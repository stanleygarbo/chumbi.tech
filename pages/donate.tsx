import { NextPage } from "next";
import Head from "next/head";
import Metamask from "../components/donate/Metamask";

const BreedingGuide: NextPage = () => {
  return (
    <div className="hero">
      <Head>
        <title>Donate to Chumbi Technologies | Chumbi Technologies</title>
        <meta
          name="description"
          content="Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Metamask />
    </div>
  );
};

export default BreedingGuide;
