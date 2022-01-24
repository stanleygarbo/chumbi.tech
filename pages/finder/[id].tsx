import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import FetchTokenURI from "../../api/FetchTokenURI";
import Attributes from "../../components/finder/Attributes";
import ChumbiImg from "../../components/finder/ChumbiImg";
import { useWallet } from "../../contexts/walletContext";

const ID: NextPage = () => {
  const router = useRouter();
  const { tokenURI } = useWallet();
  const [ipfsID, setIpfsID] = useState<string>("");

  useEffect(() => {
    let _isMounted = true;

    if (router.query.id) {
      (async function () {
        const uri = await tokenURI(Number(router.query.id));
        if (uri) setIpfsID(uri.replace("ipfs://", ""));
      })();
    } else {
      if (router.query.ipfs) setIpfsID(router.query.ipfs?.toString());
    }

    return () => {
      _isMounted = false;
    };
  }, [router.query, tokenURI]);

  const { data } = useSWR(
    ["TokenURI", ipfsID],
    () => (ipfsID ? FetchTokenURI(ipfsID) : null),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  return (
    <Container className="hero">
      <div className="left">
        <h1>{data?.name}</h1>
        <ChumbiImg
          img={
            data
              ? "https://ipfs.io/ipfs/" + data?.image.replace("ipfs://", "")
              : ""
          }
        />
      </div>
      <div className="right">
        <Attributes attributes={data?.attributes} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1140px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  @media (max-width: 680px) {
    flex-direction: column;
    gap: 10px;
  }

  .left {
    margin-top: 20px;
    /* position: sticky; */
    /* top: 20px; */

    h1 {
      font-size: 20px;
      color: #fff;
      margin-bottom: 20px;
    }
  }

  .right {
    margin-top: 20px;
  }
`;

export default ID;
