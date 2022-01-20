import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IAttributes } from "../../interfaces/finder/IAttributes";
import { IColors } from "../../interfaces/IColors";

const Attributes: React.FC<IAttributes> = ({ attributes }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <h2>Attributes</h2>
      <div className="attributes">
        {attributes?.map((i, idx) => (
          <div className="attributes__item" key={idx}>
            <div className="attributes__item__name">{i.trait_type}</div>
            <div className="attributes__item__val">{i.value}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .attributes {
      margin-top: 20px;

      &__item {
        display: flex;
        margin-top: 10px;

        &__name {
          color: ${colors.text1};
          font-weight: 600;
          padding-right: 20px;
          margin-right: 20px;
          border-right: 1px solid ${colors.border1};
        }

        &__val {
          color: ${colors.text2};
        }
      }
    }
  `}
`;

export default Attributes;
