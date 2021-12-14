import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { ICircularLoader } from "../interfaces/ICircularLoader";
import { IColors } from "../interfaces/IColors";

const CircularLoader: React.FC<ICircularLoader> = ({ size }) => {
  const dimensions = size === "small" ? 20 : size === "medium" ? 30 : 40;

  const { colors } = useTheme();

  return (
    <Container
      style={{
        width: dimensions,
        height: dimensions,
        borderWidth: dimensions / 10,
      }}
      colors={colors}
    ></Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    border-bottom: 3px solid ${colors.accent};
    border-top: 3px solid ${colors.text1 + 20};
    border-left: 3px solid ${colors.text1 + 20};
    border-right: 3px solid ${colors.text1 + 20};
    border-radius: 100px;
    animation: rotate 0.5s linear infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

export default CircularLoader;
