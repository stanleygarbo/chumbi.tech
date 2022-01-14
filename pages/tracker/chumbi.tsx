import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";
import FetchChumbiOfAddress from "../../api/FetchChumbiOfAddress";
import ChumbiCards from "../../components/chumbi-cards/ChumbiCards";
import { useTheme } from "../../contexts/themeContext";
import { useWallet } from "../../contexts/walletContext";
import { IColors } from "../../interfaces/IColors";

const Chumbi: NextPage = () => {
  const { current, totalChumbi } = useWallet();
  const [chumbiAmount, setChumbiAmount] = useState<number>(-1);
  const { colors } = useTheme();

  const { data, isValidating } = useSWR(
    ["ChumbiOfAddress", current],
    () => (current ? FetchChumbiOfAddress(current) : null),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    let _isMounted = true;

    (async function () {
      if (current) {
        const res = await totalChumbi(current);
        if (res && _isMounted) setChumbiAmount(res);
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, [current, totalChumbi]);

  return (
    <Container colors={colors} className="tracker">
      <div className="content">
        <h2>
          Your Chumbi:&nbsp;
          {chumbiAmount >= 0 && current ? (
            chumbiAmount
          ) : chumbiAmount < 0 && current ? (
            <img src="/dots-loader.svg" width={17} alt="" />
          ) : (
            !current && "not connected"
          )}
        </h2>
        {data && <ChumbiCards data={data} />}
      </div>
    </Container>
  );
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
