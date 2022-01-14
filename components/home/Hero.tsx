import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import SkewedBorder from "../patterns/SkewedBorder";
import Socials from "../Socials";
import CHMBTicker from "../tickers/CHMBTicker";

const Hero = () => {
  const { colors } = useTheme();

  return (
    <StyledHero colors={colors}>
      <div className="hero__ticker">
        <div className="hero__ticker__wrapper">
          <CHMBTicker />
        </div>
      </div>
      <div className="hero__container container">
        <div className="hero__container__left-txt">FAN-MADE</div>
        <div className="hero__container__left-socials">
          <Socials isHorizontal={false} />
        </div>
        <div className="hero__content">
          <h1>
            Welcome to
            <br /> Chumbi <br />
            Technologies!
          </h1>
          <p>
            A dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon.
          </p>
        </div>

        <img className="hero__nft" alt="" src="/chmb.png"></img>
      </div>
      <div className="hero__bg-txt">CHUMBI</div>
      <SkewedBorder position="bottom-right" bg={colors.bg1} />
    </StyledHero>
  );
};

const StyledHero = styled.section<{ colors: IColors }>`
  ${({ colors }) => css`
    width: 100%;
    position: relative;

    height: 670px;
    overflow: hidden;
    /* border-bottom: 2px solid ${colors.accent}; */

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0px;
      left: -50px;
      background: ${colors.border1};
      z-index: 3;
    }

    .hero__ticker {
      position: absolute;
      width: 100%;
      top: 10px;
      right: 0;
      z-index: 12;

      &__wrapper {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
      }
    }

    .hero__container {
      z-index: 2;
      position: relative;
      max-width: 1100px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding-top: 100px;

      &__left-txt {
        color: ${colors.text1};
        font-weight: 500;
        position: absolute;
        left: -30px;
        transform: rotate(-90deg) translateX(50px);
      }

      &__left-socials {
        position: absolute;
        bottom: 20px;
        left: -10px;
        z-index: 11;
      }
    }

    .hero__content {
      max-width: 500px;
      padding-left: 100px;
      z-index: 2;

      h1 {
        color: ${colors.text1};
        font-size: 40px;
      }

      p {
        margin: 50px 0px;
        line-height: 30px;
        font-weight: 300;
        color: ${colors.text2};
      }
    }

    .hero__pattern {
      height: 670px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .hero__bg-txt {
      color: ${colors.text3};
      font-size: 200px;
      font-weight: 890;
      position: absolute;
      pointer-events: none;
      height: 670px;
      display: flex;
      align-items: center;

      letter-spacing: 20px;
      top: 0;
      left: -50px;
    }

    .hero__nft {
      width: 1000px;

      position: absolute;
      top: -100px;
      right: -250px;
    }

    @media (max-width: 610px) {
      height: 750px;

      .hero__nft {
        top: unset;
        width: 500px;
        right: unset;
        right: -150px;

        bottom: -180px;
      }

      .hero__content {
        padding: 40px;
        padding-top: 80px;
      }

      .hero__container {
        align-items: flex-start;

        &__left-txt {
          display: none;
        }

        &__left-socials {
          display: none;
        }
      }
    }
  `}
`;

export default Hero;
