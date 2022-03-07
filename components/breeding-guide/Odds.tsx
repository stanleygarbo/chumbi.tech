import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { IOdds } from "../../util/breed";

const Odds: React.FC<{ data?: IOdds }> = ({ data }) => {
  const { colors } = useTheme();

  if (data)
    return (
      <Container colors={colors}>
        <p className="breeding-info">
          Before breeding Chumbi, you can test the outcome and your luck as
          often as want with the ChumbiTech Breeding Simulator. The images of
          some traits are still unkown, instead you&apos;ll be able to know the
          coat, type, size and if it is shiny.
        </p>
        <div className="percentage">
          <div className="percentage__title">Shiny</div>
          <div className="percentage__bar">
            <div className="percentage__bar__value">{data.shiny}%</div>
            <div className="percentage__bar__progress">
              <div
                className="percentage__bar__progress__value"
                style={{ width: data.shiny + "%" }}
              ></div>
            </div>
          </div>
          <div className="percentage__title">Mini</div>
          <div className="percentage__bar">
            <div className="percentage__bar__value">{data.mini}%</div>
            <div className="percentage__bar__progress">
              <div
                className="percentage__bar__progress__value"
                style={{ width: data.mini + "%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="percentage">
          <div className="percentage__title">Parent 1 Coat</div>
          <div className="percentage__bar">
            <div className="percentage__bar__value">
              {data.coatType.parent1}%
            </div>
            <div className="percentage__bar__progress">
              <div
                className="percentage__bar__progress__value"
                style={{ width: data.coatType.parent1 + "%" }}
              ></div>
            </div>
          </div>
          <div className="percentage__title">Parent 2 Coat</div>
          <div className="percentage__bar">
            <div className="percentage__bar__value">
              {data.coatType.parent2}%
            </div>

            <div className="percentage__bar__progress">
              <div
                className="percentage__bar__progress__value"
                style={{ width: data.coatType.parent2 + "%" }}
              ></div>
            </div>
          </div>

          <div className="percentage__title">Random Coat</div>
          <div className="percentage__bar">
            <div className="percentage__bar__value">
              {data.coatType.random}%
            </div>

            <div className="percentage__bar__progress">
              <div
                className="percentage__bar__progress__value"
                style={{ width: data.coatType.random + "%" }}
              ></div>
            </div>
          </div>
        </div>
      </Container>
    );

  return null;
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;

    .breeding-info {
      color: ${colors.text2};
      font-size: 13px;
    }

    .percentage {
      color: ${colors.text2};
      font-size: 15px;

      &__bar {
        display: flex;
        align-items: center;
        font-size: 12px;

        &__value {
          width: 33px;
        }

        &__progress {
          width: 100%;

          height: 5px;
          background: ${colors.bg4};
          border-radius: 5px;

          &__value {
            background: ${colors.accent};
            border-radius: 5px;
            height: 100%;
          }
        }
      }
    }
  `}
`;

export default Odds;
