import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import ConnectWallet from "../ConnectWallet";

const IndexHero: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="connect">
        <ConnectWallet />
      </div>
      <div className="banner">
        <div className="banner__text">
          <h1>
            Welcome to the first <br />
            chumbi tracker
          </h1>
          <p>
            Huge disclaimer: chumbi.tech is not affiliated with Chumbi Valley,
            this is purely a community-initiated project.
          </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    height: 100vh;
    position: relative;

    .connect {
      display: flex;
      height: 100%;
      width: 400px;

      /* max-width: 1140px; */
      background: ${colors.bg1};
      /* justify-content: center;  */
      padding: 40px;
      padding-top: 150px;
      z-index: 10;

      @media (max-width: 400px) {
        width: 100%;
        padding: 20px;
        padding-top: 100px;
      }
    }

    .banner {
      position: absolute;
      width: 100%;
      height: 100vh;
      padding-left: 440px;
      padding-top: 140px;
      right: 0;
      top: 0;

      background-image: url("/chumbi-banner.webp");
      background-position: 400px;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;

      animation: banner 55s infinite;

      @keyframes banner {
        0% {
          background-position: 400px;
        }
        50% {
          background-position: right;
        }
        100% {
          background-position: 400px;
        }
      }

      &::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          ${colors.bg1 + "cc"},
          ${colors.bg1 + "cc"}
        );
        z-index: -1;
      }

      &__text {
        background-repeat: no-repeat;

        @media (max-width: 864px) {
          display: none;
        }

        h1 {
          color: ${colors.text1};
          z-index: 1;
        }

        p {
          color: ${colors.text2};
          z-index: 1;
          max-width: 400px;
          margin-top: 30px;
        }
      }
    }
  `}
`;

export default IndexHero;
