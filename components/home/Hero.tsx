import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import SkewedBorder from "../patterns/SkewedBorder";
import Socials from "../Socials";

const Hero = () => {
  const { colors } = useTheme();

  return (
    <StyledHero colors={colors} className="hero">
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
            A fan-made website dedicated to Chumbi Valley. Chumbi Technologies
            offers free tools and guides for the chumbi community.
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
      background: ${colors.accent};
      z-index: 3;
    }

    .hero__container {
      z-index: 2;
      position: relative;
      max-width: 1100px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding-top: 60px;

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
        left: 5px;
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
  `}
`;

export default Hero;
