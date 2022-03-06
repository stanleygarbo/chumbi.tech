import { NextPage } from "next";
import Head from "next/head";
import BreedingSim from "../components/breeding-guide/BreedingSim";
// import Hero from "../components/breeding-guide/Hero";

const BreedingGuide: NextPage = () => {
  return (
    <div className="hero">
      <Head>
        <title>Chumbi breeding guide for beginners | Chumbi Technologies</title>
        <meta
          name="description"
          content="Check out our breeding guide and make breeding predictable. 
          Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Hero /> */}
      <BreedingSim />
    </div>
  );
};

export default BreedingGuide;
