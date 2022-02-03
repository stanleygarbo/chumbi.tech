import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import FetchTokenURI from "../../api/FetchTokenURI";
import ChumbatarGenerator from "../../components/chumbatar-generator/ChumbatarGenerator";
import { useWallet } from "../../contexts/walletContext";

const ChumbatarGeneratorPage: NextPage = () => {
  const router = useRouter();
  const { tokenURI } = useWallet();
  const [ipfsID, setIpfsID] = useState<string>("");

  useEffect(() => {
    if (!router.query.ipfs && router.query.id) {
      (async function () {
        console.log(true);

        const uri = await tokenURI(Number(router.query.id));
        if (uri) setIpfsID(uri.replace("ipfs://", ""));
      })();
    } else {
      if (router.query.ipfs) setIpfsID(router.query.ipfs?.toString());
    }
  }, [router.query, tokenURI]);

  const { data } = useQuery(
    ["TokenURI", ipfsID],
    () => (ipfsID ? FetchTokenURI(ipfsID) : null),
    { staleTime: Infinity }
  );

  return (
    <div className="hero">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data?.image && (
        <ChumbatarGenerator
          id={Number(router.query.id)}
          image={"https://ipfs.io/ipfs/" + data?.image.replace("ipfs://", "")}
        />
      )}
    </div>
  );
};

export default ChumbatarGeneratorPage;
