import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import Ticker from "../tickers/CHMBTicker";
import BreedingTree from "./BreedingTree";

const Hero = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="hero">
        <h1>Chumbi Breeding Guide</h1>

        <BreedingTree />
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .hero {
      max-width: 1140px;
      margin: 0 auto;
      position: relative;
      z-index: 1;

      h1 {
        padding: 40px 20px 20px 20px;
        font-size: 20px;
        color: ${colors.text1};
      }
    }
  `}
`;

export default Hero;
