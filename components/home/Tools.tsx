import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import SkewedRect from "../patterns/SkewedRect";
// import { CgTrack } from "react-icons/cg";
// import { AiOutlinePicture } from "react-icons/ai";
import Button from "../Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useWallet } from "../../contexts/walletContext";

const Tools = () => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const { current } = useWallet();

  return (
    <Container colors={colors}>
      <div className="tools">
        <div className="tools__title">
          <SkewedRect background={colors.border1} foreground={colors.text1}>
            TOOLS
          </SkewedRect>
        </div>
        <div className="tools__cards">
          <div className="tools__cards__card">
            <div className="tools__cards__card__icon">
              <Image
                src="/tool-icons/scholar-chumbi.png"
                placeholder="blur"
                blurDataURL="/tool-icons/scholar-chumbi.png"
                width={86.88}
                height={100}
                alt=""
              />
            </div>
            <h2>Tracker</h2>
            <p>Keep track of your chumbi and fostership earnings.</p>
            {/* <CgTrack /> */}
            <Button
              onClick={() =>
                current ? push("/tracker/chumbi") : push("/tracker")
              }
            >
              Open
            </Button>
          </div>
          <div className="tools__cards__card">
            {/* <AiOutlinePicture /> */}
            <div className="tools__cards__card__icon">
              <Image
                src="/tool-icons/seed.png"
                placeholder="blur"
                blurDataURL="/tool-icons/seed.png"
                width={150}
                height={102}
                alt=""
              />
            </div>
            <h2>Seed Ranking</h2>
            <p>
              Look for the rarest chumbi you want! or know how rare yours is!
            </p>
            <Button onClick={() => push("/seed-ranking")}>Open</Button>
          </div>

          <div className="tools__cards__card">
            {/* <AiOutlinePicture /> */}
            <div className="tools__cards__card__icon">
              <Image
                src="/tool-icons/hatching-chumbi.png"
                placeholder="blur"
                blurDataURL="/tool-icons/hatching-chumbi.png"
                height={100}
                width={121.2}
                alt=""
              />
            </div>
            <h2>Breeding Simulator</h2>
            <p>Test the outcome and your luck with our Breeding Simulator.</p>
            <Button onClick={() => push("/breeding-simulator")}>Open</Button>
          </div>
        </div>
      </div>

      <div className="bg-txt">TOOLS AND STUFF</div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    background: ${colors.bg1};
    overflow: hidden;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;

    .bg-txt {
      color: ${colors.text4};
      font-size: 200px;
      font-weight: 890;
      position: absolute;
      pointer-events: none;
      height: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;

      letter-spacing: 20px;
      top: 0;
      z-index: -2;

      @media (max-width: 1100px) {
        white-space: unset;
        text-align: center;
        left: unset;
      }
    }

    .tools {
      max-width: 1140px;
      /* min-height: 100vh; */
      border-left: 1px solid ${colors.border1};
      padding: 0 20px;
      margin: 0 auto;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 8px;
        background: ${colors.accent};
        top: 0px;
        left: 0px;
      }

      &::after {
        content: "";
        position: absolute;
        width: 13px;
        height: 13px;
        background: ${colors.border1};
        top: 140px;
        left: 100px;
      }

      &__title {
        margin: 0 auto;
        width: fit-content;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: ${colors.border1};
          bottom: -40px;
          left: -100px;
        }

        &::after {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          background: ${colors.border1};
          bottom: -40px;
          left: 100px;
        }
      }

      &__cards {
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); */
        display: flex;
        flex-wrap: wrap;
        padding: 80px 0px;
        gap: 20px;
        justify-content: center;

        &__card {
          text-align: center;
          padding: 20px;
          /* border-left: 2px solid ${colors.border1}; */
          width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          &:nth-child(1) {
            &::before {
              content: "";
              position: absolute;
              width: 7px;
              height: 7px;
              background: ${colors.accent};
              bottom: -10px;
              right: 0px;
            }

            &::after {
              content: "";
              position: absolute;
              width: 10px;
              height: 10px;
              background: ${colors.border1};
              left: -10px;
              bottom: -10px;
            }
          }

          &:nth-child(3) {
            &::before {
              content: "";
              position: absolute;
              width: 7px;
              height: 7px;
              background: ${colors.accent};
              top: -10px;
              right: 0px;
            }

            &::after {
              content: "";
              position: absolute;
              width: 10px;
              height: 15px;
              background: ${colors.border1};
              right: -10px;
              bottom: 0px;
            }
          }

          h2 {
            color: ${colors.text1};
            margin-top: 20px;
          }

          p {
            color: ${colors.text2};
            margin: 30px 0px;
          }

          &__icon {
            position: relative;
            bottom: -10px;
          }
        }
      }
    }
  `}
`;

export default Tools;
