import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchChumbiOfAddress from "../../../api/FetchChumbiOfAddress";
import ChumbiCards from "../../../components/chumbi-cards/ChumbiCards";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTheme } from "../../../contexts/themeContext";
import { useWallet } from "../../../contexts/walletContext";
import { IColors } from "../../../interfaces/IColors";
import { isWalletAddressValid } from "../../../util/isWalletAddressValid";

const Chumbi: NextPage = () => {
  const { totalChumbi, setCurrent } = useWallet();
  const [chumbiAmount, setChumbiAmount] = useState<number>(-1);
  const { colors } = useTheme();
  const router = useRouter();

  const { address } = router.query;

  const { data } = useQuery(
    ["ChumbiOfAddress", address],
    () => (address ? FetchChumbiOfAddress(address.toString()) : null),
    {
      staleTime: Infinity,
      enabled: !!(address && isWalletAddressValid(address)),
    }
  );

  useEffect(() => {
    let _isMounted = true;

    (async function () {
      if (address && isWalletAddressValid(address)) {
        const res = await totalChumbi(address.toString());
        if (res && _isMounted) setChumbiAmount(res);
        setCurrent(address.toString());
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, [address, totalChumbi]);

  if (address && isWalletAddressValid(address))
    return (
      <Container colors={colors} className="tracker">
        <Head>
          <title>Your Chumbi | Chumbi Technologies | Chumbi Tracker</title>
          <meta
            name="description"
            content="Your Chumbi. A tracker for Chumbi valley. 
          Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="content">
          <h2>
            Your Chumbi:&nbsp;
            {chumbiAmount >= 0 && router.query.address ? (
              chumbiAmount
            ) : chumbiAmount < 0 && router.query.address ? (
              <img src="/dots-loader.svg" width={17} alt="" />
            ) : (
              !router.query.address && "Invalid address"
            )}
          </h2>
          {data && <ChumbiCards data={data} linkTo="/finder/" />}
        </div>
      </Container>
    );

  return <ErrorMessage message="Invalid Wallet Address" status={404} />;
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .content {
      max-width: 1140px;
      padding: 0 20px;
      margin: 0 auto;

      h2 {
        color: ${colors.text2};
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        img {
          margin-left: 5px;
        }
      }
    }
  `}
`;

export default Chumbi;
