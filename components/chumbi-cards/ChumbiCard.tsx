import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IChumbiCard } from "../../interfaces/chumbi-cards/IChumbiCard";
import { IColors } from "../../interfaces/IColors";

const ChumbiCard: React.FC<IChumbiCard> = ({
  edition,
  name,
  seed,
  image,
  maintype,
  rarityrank = 0,
  coattype,
}) => {
  const { colors } = useTheme();

  const percentageDeduction =
    Math.round(100 - (rarityrank / 4096) * 100) < 50 ? 100 : 0;

  return (
    <Container colors={colors}>
      <div className="header">
        <div className="header__id">Ranked #{rarityrank}</div>
        <section>
          <Image src={`/seed/${seed}.webp`} width={20} height={20}></Image>
          &nbsp;
          <div
            className={`header__rarity header__rarity--${seed?.toLowerCase()}`}
          >
            {seed}
          </div>
        </section>
      </div>
      <div className={`types`}>
        <div className="types__item">
          Type:&nbsp;
          <div className={`types__item__main ${maintype} type-and-coat`}>
            <Image src={`/types/${maintype}.png`} width={15} height={15} />
            &nbsp;
            {maintype}
          </div>
        </div>
        <div className="types__item">
          Coat:&nbsp;
          <div className={`types__item__main ${coattype} type-and-coat`}>
            <Image src={`/types/${coattype}.png`} width={15} height={15} />
            &nbsp;
            {coattype}
          </div>
        </div>
      </div>
      {/* <img src={image} alt="chumbi" className="chumbi" /> */}
      <div className="chumbi">
        {/* {isLoading ? (
          <Image src="/ripple-loader.svg" priority width={50} height={50} />
        ) : ( */}
        <Image src={image} layout="fill" alt="" />
        {/* )} */}
      </div>
      <div className="footer">
        <div className="footer__name">
          {name} #{edition}
        </div>
        <div className="footer__rarityrank">
          <div
            className="footer__rarityrank__point"
            style={{ width: `${100 - (rarityrank / 4096) * 100}%` }}
          ></div>
        </div>
        <div className="footer__ranking">
          <span>Rarity:&nbsp;</span>
          {Math.round(100 - (rarityrank / 4096) * 100) < 50
            ? "bottom "
            : "top "}
          {Math.abs(
            Math.round(percentageDeduction - (rarityrank / 4096) * 100)
          )}
          %
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    /* width: 225px; */
    padding: 10px;
    background: ${colors.bg4};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.bg4};
    transition: 0.15s;

    &:hover {
      border: 1px solid ${colors.border1};
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__id {
        color: ${colors.text2};
        font-size: 12px;
      }

      section {
        display: flex;
        align-items: center;
      }

      &__rarity {
        color: #fff;
        padding: 0 10px;
        border-radius: 50px;
        font-size: 11px;
        text-transform: capitalize;

        &--rare {
          background: var(--color-rare);
        }
        &--epic {
          background: var(--color-epic);
        }
        &--legendary {
          background: var(--color-legendary);
        }
        &--mythic {
          background: var(--color-mythic);
        }
      }
    }

    .types {
      color: ${colors.text2};
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      &__item {
        display: flex;
        align-items: center;
        font-size: 12px;

        &__main {
          padding-left: 3px;
          text-transform: capitalize;
          display: flex;
          align-items: center;
        }
      }
    }

    .footer {
      text-align: center;

      &__rarityrank {
        height: 5px;
        width: 100%;
        border-radius: 50px;
        background: linear-gradient(45deg, #323a7a, #2b5d99, #ff447d, #ebe424);
        position: relative;

        &__point {
          height: 5px;
          position: relative;
          display: flex;
          align-items: center;

          &::before {
            content: "";
            position: absolute;
            right: 0;
            width: 10px;
            height: 10px;
            background: #fff;
            border-radius: 10px;
          }
        }
      }

      &__ranking {
        font-size: 10px;
        color: ${colors.text1};
        margin-top: 5px;

        span {
          color: ${colors.text2};
        }
      }

      &__name {
        color: ${colors.text1};
        font-size: 13px;
        margin-bottom: 10px;
      }
    }

    .chumbi {
      /* height: 400px; */
      /* height: 205px; */
      border-radius: 10px;
      overflow: hidden;
      margin: 10px 0px;
      position: relative;
      display: flex;
      justify-content: center;

      &::before {
        content: "";
        display: block;
        padding-top: 100%;
        /* initial ratio of 1:1*/
      }
    }
  `}
`;

export default ChumbiCard;
