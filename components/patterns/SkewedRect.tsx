import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { ISkewedRect } from "../../interfaces/patterns/ISkewedRect";

const SkewedRect: React.FC<ISkewedRect> = ({
  children,
  background,
  foreground,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors} background={background} foreground={foreground}>
      <div className="pattern-child">{children}</div>
      {/* <span className="pattern-tail">
        <div className="pattern-tail__skewed"></div>
      </span> */}
    </Container>
  );
};

const Container = styled.div<{
  colors: IColors;
  background?: string;
  foreground?: string;
}>`
  ${({ colors, background, foreground }) => css`
    background: ${background ? background : colors.accent};
    color: ${foreground ? foreground : "#fff"};
    width: fit-content;
    padding: 4px 10px 4px 10px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 50px;
      height: 100%;
      background: inherit;
      top: 0;
      right: -20px;
      transform: skew(-45deg);
      z-index: 1;
    }

    &::after {
      content: "";
      position: absolute;
      width: 50px;
      height: 100%;
      background: inherit;
      top: 0;
      left: -20px;
      transform: skew(45deg);
      z-index: 1;
    }

    .pattern-tail {
      position: absolute;
      width: 3px;
      height: 300px;
      background: inherit;
      top: 0;
      left: 0;
      z-index: 1;

      /* &__skewed {
        position: absolute;
        width: 7px;
        height: 50%;
        background: inherit;
        bottom: 50px;
        left: 0;

        &::before {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          background: inherit;
          transform: skew(0deg, 45deg);
          top: -2px;
          left: 0;
        }

        &::after {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          background: inherit;
          transform: skew(0deg, -45deg);
          bottom: -2px;
          left: 0;
        }
      } */
    }

    .pattern-child {
      position: relative;
      z-index: 2;
      font-weight: 700;
      font-size: 16px;
      /* font-style: italic; */
    }
  `}
`;

export default SkewedRect;
