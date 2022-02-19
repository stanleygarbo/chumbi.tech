import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchSingleChumbi from "../../api/FetchSingleChumbi";
import { useTheme } from "../../contexts/themeContext";
import { IFetchSingleChumbi } from "../../interfaces/api/IFetchSingleChumbi";
import { IChumbiInfo } from "../../interfaces/finder/IChumbiInfo";
import { IColors } from "../../interfaces/IColors";

const ChumbiInfo: React.FC<IChumbiInfo> = ({ id }) => {
  const { data, isLoading } = useQuery<IFetchSingleChumbi>(
    ["chumbi_", id],
    () => FetchSingleChumbi(id)
  );

  const { colors } = useTheme();
  const mainType = data?.attributes[6].value;
  const coatType = data?.attributes[11].value;
  const seed = data?.attributes[8].value;
  const highestRarityScore = data?.chart
    ? Math.max.apply(
        Math,
        data.chart.map(function (o: any) {
          return o.score;
        })
      )
    : null;

  return (
    <Container colors={colors}>
      <div className="side">
        {data?.imagehash && (
          <img
            className="side__chumbi"
            src={`https://res.cloudinary.com/dr4q1cnig/image/upload/w_500,h_500/v1644474238/chumbi/${data.edition}.png`}
            alt=""
          />
        )}

        <a
          href={`https://opensea.io/assets/matic/0x5492ef6aeeba1a3896357359ef039a8b11621b45/${data?.edition}`}
          target="blank"
        >
          <img src="/icons/opensea.svg" alt="" width={30} />
          View on OpenSea
        </a>
      </div>
      {isLoading && <img src={"/dots-loader.svg"} width={25} alt="" />}
      <div className="side side--info">
        <h1>{data?.name}</h1>

        {data && (
          <div className="side__header">
            <div className="side__header__att">
              Type:&nbsp;
              <div
                className={`side__header__att__item ${mainType} type-and-coat`}
              >
                <Image
                  src={`/types/${mainType}.png`}
                  width={15}
                  height={15}
                  alt=""
                />
                &nbsp;
                {mainType}
              </div>
            </div>
            <div className="side__header__att">
              Coat:&nbsp;
              <div
                className={`side__header__att__item ${coatType} type-and-coat`}
              >
                <Image
                  src={`/types/${coatType}.png`}
                  width={15}
                  height={15}
                  alt=""
                />
                &nbsp;
                {coatType}
              </div>
              <div className="side__header__att">
                Seed:&nbsp;
                <div
                  className={`side__header__att__item ${seed} type-and-coat`}
                >
                  <Image
                    src={`/seed/${seed}.webp`}
                    width={15}
                    height={15}
                    alt=""
                  />
                  &nbsp;
                  {seed}
                </div>
              </div>
            </div>
          </div>
        )}
        {data?.raritytraitscore && (
          <h2>Rarity Score: {data.raritytraitscore.toFixed(2)}</h2>
        )}
        {data?.chart && (
          <div className="side__rarity-score">
            {data?.chart.map(
              (i, idx: number) =>
                i.traitType !== "Breed Count" && (
                  <section key={idx}>
                    <div className="side__rarity-score__desc">
                      <div className="side__rarity-score__desc__left">
                        {i.traitType}: <span>{i.traitValue}</span> (
                        {i.traitCommonality < 1
                          ? i.traitCommonality.toFixed(2)
                          : Math.round(i.traitCommonality)}
                        % have this)
                      </div>
                      <div className="side__rarity-score__desc__points">
                        +{i.score.toFixed(2)}
                      </div>
                    </div>
                    <div className={`side__rarity-score__bar`}>
                      <div
                        className={`side__rarity-score__bar__score ${mainType}`}
                        style={{
                          width:
                            (highestRarityScore
                              ? (i.score / highestRarityScore) * 100
                              : 0) + "%",
                        }}
                      ></div>
                    </div>
                  </section>
                )
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    width: 100%;
    margin: 0 auto;
    display: flex;
    height: 100%;

    .side {
      width: 50%;

      &:nth-child(1) {
        position: sticky;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;

        top: 20px;
      }

      a {
        position: absolute;
        bottom: 20px;

        border-radius: 100px;
        padding: 10px 25px 10px 10px;

        text-decoration: none;
        font-weight: 600;

        color: #000;
        background: #fff;

        display: flex;
        align-items: center;

        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

        &:hover {
          opacity: 0.8;
        }

        img {
          margin-right: 10px;
        }
      }

      &--info {
        padding: 20px;
        overflow-y: auto;
      }

      &__chumbi {
        width: 100%;
      }

      &__header {
        display: flex;
        align-items: center;
        color: ${colors.text2};
        &__att {
          display: flex;
          align-items: center;
          font-size: 13px;

          &__item {
            display: flex;
            padding-left: 5px;
            text-transform: capitalize;
            margin-right: 10px;
          }
        }
      }

      h1 {
        font-size: 20px;
        color: ${colors.text1};
        margin-bottom: 20px;
      }

      h2 {
        margin: 20px 0;
        color: ${colors.text2};
      }

      &__rarity-score {
        &__desc {
          color: ${colors.text2};
          font-size: 13px;
          text-transform: capitalize;
          display: flex;
          justify-content: space-between;

          &__left {
            span {
              font-weight: 700;
            }
          }
          &__points {
            color: ${colors.success};
          }
        }
        &__bar {
          height: 7px;
          border-radius: 50px;
          margin-bottom: 10px;
          margin-top: 3px;
          width: 100%;
          background: ${colors.bg4};

          &__score {
            height: 100%;
            border-radius: 50px;
          }
        }
      }
    }
    @media (max-width: 752px) {
      flex-direction: column;

      .side {
        width: 100%;

        &--info {
          padding-left: 0px;
        }

        &__chumbi {
          width: 100%;
          position: relative;
          top: 0px;
          margin-bottom: 20px;
        }
      }
    }
  `}
`;

export default ChumbiInfo;
