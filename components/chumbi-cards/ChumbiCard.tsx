import Image from "next/image";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IChumbiCard } from "../../interfaces/chumbi-cards/IChumbiCard";
import { IColors } from "../../interfaces/IColors";

const ChumbiCard: React.FC<IChumbiCard> = ({
  id,
  name,
  rarity,
  image,
  type,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="header">
        <div className="header__id">#{id}</div>
        <div
          className={`header__rarity header__rarity--${rarity?.toLowerCase()}`}
        >
          {rarity}
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
        <div className="footer__name">{name}</div>
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

      &__rarity {
        color: #fff;
        padding: 0 10px;
        border-radius: 50px;
        font-size: 11px;

        &--rare {
          background: var(--color-rare);
        }
        &--epic {
          background: var(--color-epic);
        }
        &--legend {
          background: var(--color-legend);
        }
        &--mythic {
          background: var(--color-mythic);
        }
      }
    }

    .footer {
      text-align: center;
      &__name {
        color: ${colors.text2};
        font-size: 12px;
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
