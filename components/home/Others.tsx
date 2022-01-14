import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import Button from "../Button";

const Others: React.FC = () => {
  const { colors } = useTheme();
  const { push } = useRouter();

  return (
    <Container colors={colors}>
      <div className="wrapper">
        <div className="wrapper__left">
          <div className="wrapper__left__gradient"></div>
          {/* <img src="/CV-night-time.png" height="100%" alt="" /> */}
          <div className="wrapper__left__content">
            <p>
              Check out our <s>Chumbi condoms</s> breeding guide
            </p>
            <div className="wrapper__left__content__bottom">
              <h2>
                Make breeding
                <br />
                predictable <s>and pleasurable</s>
              </h2>
              <Button onClick={() => push("/breeding-guide")}>
                CHECK BREEDING GUIDE
              </Button>
            </div>
          </div>
        </div>
        <div className="wrapper__right">
          <div className="wrapper__right__gradient"></div>
          {/* <img src="/chumbi-banner.png" height="100%" alt="" /> */}
          <div className="wrapper__right__content">
            <p>
              Donate to help pay for <s>my tuition</s> the server fees
            </p>
            <div className="wrapper__right__content__bottom">
              <h2>
                Just make me
                <br />
                rich god damn it
              </h2>
              <Button onClick={() => push("/donate")}>DONATE</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    background: ${colors.bg1};

    border-top: 2px solid ${colors.border1};
    width: 100%;

    .wrapper {
      max-width: 1140px;
      margin: 0 auto;

      display: flex;
      overflow: hidden;

      &__left,
      &__right {
        width: 50%;
        position: relative;
        height: 322.84px;

        &__gradient {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        &__content {
          position: absolute;
          top: 0;
          left: 0;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 100%;
          height: 100%;
          padding: 40px 20px;

          z-index: 2;

          s {
            text-decoration-thickness: 3px;
          }

          h2 {
            font-size: 20px;
            margin-bottom: 20px;
          }

          p {
            color: ${colors.text2};
            font-weight: 500;
          }
        }
      }

      &__left {
        border-right: 1px solid ${colors.border1};
        background-image: url("/CV-night-time.png");
        background-size: cover;

        &__gradient {
          background: linear-gradient(90deg, ${colors.bg1}, ${colors.bg1 + 80});
        }
      }
      &__right {
        border-left: 1px solid ${colors.border1};
        background-image: url("/chumbi-banner.png");
        background-size: cover;

        &__gradient {
          background: linear-gradient(
            -90deg,
            ${colors.bg1},
            ${colors.bg1 + "BF"}
          );
        }
      }

      @media (max-width: 689px) {
        flex-direction: column;
        height: fit-content;

        &__left,
        &__right {
          width: 100%;
        }

        &__left {
          border-right: none;
        }

        &__right {
          border-left: none;
          border-top: 2px solid ${colors.border1};

          &__gradient {
            background: linear-gradient(
              90deg,
              ${colors.bg1},
              ${colors.bg1 + 80}
            );
          }
        }
      }
    }
  `}
`;

export default Others;
