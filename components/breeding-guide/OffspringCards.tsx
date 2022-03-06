import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { IOffspring } from "../../util/breed";

const OffspringCards: React.FC<{ offsprings: IOffspring[] }> = ({
  offsprings,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      {offsprings.map((i, idx) => (
        <div key={idx} className="offspring">
          <div className="offspring__id">
            Gen 1 #{4096 + idx + 1}{" "}
            <img src="/seed/regular.webp" width={20} alt="" />
          </div>
          <div className={`offspring__types`}>
            <div className="offspring__types__item">
              Type:&nbsp;
              <div
                className={`offspring__types__item__main ${i.mainType} type-and-coat`}
              >
                <Image
                  src={`/types/${i.mainType}.png`}
                  width={15}
                  height={15}
                  alt=""
                />
                &nbsp;
                {i.mainType}
              </div>
            </div>
            <div className="offspring__types__item">
              Coat:&nbsp;
              <div
                className={`offspring__types__item__main ${i.coatType} type-and-coat`}
              >
                <Image
                  src={`/types/${i.coatType}.png`}
                  width={15}
                  height={15}
                  alt=""
                />
                &nbsp;
                {i.coatType}
              </div>
            </div>
          </div>
          <div className="offspring__img">
            <div
              className={`offspring__img__bg ${
                i.mainType
              }-bg offspring__img__bg--${i.isShiny ? "shiny" : ""}`}
            ></div>
            {i.isMini ? null : (
              <img width={130} src="/chumbi/unknown-chumbi.png" alt="" />
            )}
            {i.isMini ? (
              <img src="/chumbi/unknown-mini.png" width={100} alt="" />
            ) : null}
          </div>
          <div className="offspring__name">
            {i.name} #{4096 + idx + 1}
          </div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .offspring {
      color: ${colors.text2};
      background: ${colors.bg4};
      padding: 10px;
      border-radius: 5px;

      &__types {
        color: ${colors.text2};
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

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

      &__id {
        font-size: 12px;
        margin-bottom: 10px;
        display: flex;

        justify-content: space-between;
      }

      &__name {
        font-size: 13px;
        color: ${colors.text1};
        text-align: center;
        margin: 10px 0;
      }

      &__img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &__bg {
          width: 240px;
          height: 240px;
          border-radius: 10px;

          &--shiny {
            background: url("/chumbi/shiny-bg.png");
            background-size: contain;
          }
        }

        img {
          position: absolute;
        }
      }
    }
  `}
`;

export default OffspringCards;
