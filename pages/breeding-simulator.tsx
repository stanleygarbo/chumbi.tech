import { NextPage } from "next";
import Head from "next/head";
import BreedingSim from "../components/breeding-guide/BreedingSim";
// import Hero from "../components/breeding-guide/Hero";

const BreedingGuide: NextPage = () => {
  return (
    <div className="hero">
      <Head>
        <title>Chumbi Breeding Simulator | Chumbi Technologies</title>
        <meta
          name="description"
          content="Before breeding Chumbi, you can test the outcome and your luck as often as want with the ChumbiTech Breeding Simulator."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Hero /> */}
      <BreedingSim />
    </div>
  );
};

export default BreedingGuide;
