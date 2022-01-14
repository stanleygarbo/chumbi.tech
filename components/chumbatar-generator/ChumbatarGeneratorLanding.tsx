import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";
import FetchChumbiOfAddress from "../../api/FetchChumbiOfAddress";
import { useTheme } from "../../contexts/themeContext";
import { useWallet } from "../../contexts/walletContext";
import { IColors } from "../../interfaces/IColors";
import ChumbiCards from "../chumbi-cards/ChumbiCards";
import Socials from "../Socials";
import FindChumbi from "./FindChumbi";

const ChumbatarGeneratorLanding: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const router = useRouter();
  const { tokenURI, totalChumbi, current } = useWallet();
  const [chumbiAmount, setChumbiAmount] = useState<number>(-1);

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
    <Container colors={colors}>
      <div className="find__chumbi">
        <div className="find__chumbi__form">
          <FindChumbi
            isLoading={isLoading}
            onSubmit={async (chumbiID) => {
              setIsLoading(true);
              const uri = await tokenURI(chumbiID);
              setIsLoading(false);
              if (uri) {
                const ipfs = uri.split("/").reverse()[0];

                router.push(
                  `/chumbi-avatar-generator/${chumbiID}/?ipfs=${ipfs}`
                );
              }
            }}
          />
        </div>
        <div className="find__chumbi__circle"></div>
        <div className="find__chumbi__plug">
          {/* w:230 */}

          <Socials
            showTitle
            isHorizontal
            colored
            rawSocialsStyle={{ width: 230 }}
            socialsStyle={{ height: 110 }}
            iconSize={25}
          />
        </div>
      </div>
      <h2>
        {current && "Chumbi in your wallet: "}
        {chumbiAmount >= 0 && current
          ? chumbiAmount
          : chumbiAmount < 0 &&
            current && <img src="/dots-loader.svg" width={17} alt="" />}
      </h2>

      {!current && (
        <div className="indicator">
          <div className="indicator__no-wallet">
            --- Can&apos;t show your Chumbi ---
            <div className="indicator__no-wallet__subtext">
              Wallet address not found
            </div>
          </div>
        </div>
      )}

      {isValidating ? (
        <div className="indicator">
          <img src="/dots-loader.svg" width={25} alt="" />
        </div>
      ) : (
        data && <ChumbiCards linkTo="/chumbi-avatar-generator/" data={data} />
      )}
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    max-width: 1140px;
    margin: 20px auto;
    padding: 0px 20px;

    .find__chumbi {
      /* max-width: fit-content; */
      /* margin: 0 auto; */
      padding: 40px 50px;
      border: 1px solid ${colors.border1};
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      &__circle {
        width: 800px;
        height: 800px;
        border-radius: 100%;
        position: absolute;
        top: -330px;
        right: 420px;

        background: linear-gradient(45deg, ${colors.bg1}, ${colors.border1});
        z-index: -1;
      }

      &__plug {
        margin: auto 50px auto 0;
      }

      @media (max-width: 809px) {
        &__plug {
          margin-right: 0px;
        }
        &__circle {
          right: 320px;
        }
      }

      @media (max-width: 750px) {
        padding: 30px;
      }

      @media (max-width: 720px) {
        padding: 20px;

        flex-direction: column;
        align-items: center;

        &__plug {
          margin-top: 40px;
        }

        &__circle {
          right: unset;
          top: -610px;

          width: 1500px;
        }
      }
      @media (max-width: 385px) {
        &__circle {
          top: -590px;
        }
      }
    }

    h2 {
      margin-top: 20px;
      margin-bottom: 20px;
      color: ${colors.text2};
      display: flex;
      align-items: center;
      img {
        margin-left: 5px;
      }
    }

    .indicator {
      width: 100%;
      height: 200px;
      display: grid;
      place-items: center;

      &__no-wallet {
        color: ${colors.text2 + "50"};
        font-weight: 700;
        text-align: center;

        &__subtext {
          font-weight: 300;
          font-size: 13px;
        }
      }
    }
  `}
`;

export default ChumbatarGeneratorLanding;
