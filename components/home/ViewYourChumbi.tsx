import Image from "next/image";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { useWallet } from "../../contexts/walletContext";
import { IColors } from "../../interfaces/IColors";
import Button from "../Button";

const ViewYourChumbi = () => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const { current } = useWallet();

  return (
    <Container colors={colors}>
      <div className="content">
        <div className="content__header">
          <h2>View Your Chumbi</h2>
          <Button
            onClick={() =>
              current ? push("/tracker/chumbi") : push("/tracker")
            }
            style={{ whiteSpace: "nowrap" }}
          >
            EXPLORE TRACKER
          </Button>
        </div>
        <div className="content__chumbi">
          <div className="content__chumbi__chumbi">
            <div className="content__chumbi__chumbi__img">
              <Image
                src="/chumbi/forest-chumbi.png"
                alt=""
                width={200}
                height={262.45}
              />
            </div>
            <div className="content__chumbi__chumbi__attributes">
              <div className="content__chumbi__chumbi__attributes__type">
                Type: <span className="forest type-and-coat">Forest</span>
              </div>
              <div className="content__chumbi__chumbi__attributes__coat">
                Coat: <span className="forest type-and-coat">Forest</span>
              </div>
            </div>
            <div className="content__chumbi__chumbi__id">
              <div className="content__chumbi__chumbi__id__icon">
                <Image src="/tier-1/forest.png" width={30} height={30} alt="" />
              </div>
              #40291
            </div>
          </div>
          <div className="content__chumbi__chumbi">
            <div className="content__chumbi__chumbi__img">
              <Image
                src="/chumbi/insect-flower-chumbi.png"
                width={200}
                height={250}
                alt=""
              />
            </div>
            <div className="content__chumbi__chumbi__attributes">
              <div className="content__chumbi__chumbi__attributes__type">
                Type: <span className="insect type-and-coat">Insect</span>
              </div>
              <div className="content__chumbi__chumbi__attributes__coat">
                Coat: <span className="flower type-and-coat">Flower</span>
              </div>
            </div>
            <div className="content__chumbi__chumbi__id">
              <div className="content__chumbi__chumbi__id__icon">
                <Image src="/tier-1/insect.png" width={30} height={30} alt="" />
              </div>
              #60021
            </div>
          </div>
          <div className="content__chumbi__chumbi">
            <div className="content__chumbi__chumbi__img content__chumbi__chumbi__img--mini">
              <Image
                src="/chumbi/mini-void-chumbi.png"
                className="mini"
                width={140}
                height={154.69}
                alt=""
              />
            </div>
            <div className="content__chumbi__chumbi__attributes">
              <div className="content__chumbi__chumbi__attributes__type">
                Type: <span className="void type-and-coat">Void</span>
              </div>
              <div className="content__chumbi__chumbi__attributes__coat">
                Coat: <span className="void type-and-coat">Void</span>
              </div>
            </div>
            <div className="content__chumbi__chumbi__id">
              <div className="content__chumbi__chumbi__id__icon">
                <Image src="/tier-4/void.png" width={30} height={30} alt="" />
              </div>
              #32051
            </div>
          </div>
          <div className="content__chumbi__chumbi">
            <div className="content__chumbi__chumbi__img">
              <Image
                src="/chumbi/crystal-chumbi.png"
                width={200}
                height={250}
                alt=""
              />
            </div>
            <div className="content__chumbi__chumbi__attributes">
              <div className="content__chumbi__chumbi__attributes__type">
                Type: <span className="crystal type-and-coat">Crystal</span>
              </div>
              <div className="content__chumbi__chumbi__attributes__coat">
                Coat: <span className="crystal type-and-coat">Crystal</span>
              </div>
            </div>
            <div className="content__chumbi__chumbi__id">
              <div className="content__chumbi__chumbi__id__icon">
                <Image
                  src="/tier-2/crystal.png"
                  width={30}
                  height={30}
                  alt=""
                />
              </div>{" "}
              #22051
            </div>
          </div>
        </div>
      </div>

      <div className="bg-txt">VIEW YOUR CHUMBI</div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    background: ${colors.bg1};
    border-top: 2px solid ${colors.border1};
    position: relative;
    overflow: hidden;
    z-index: 1;

    display: flex;
    justify-content: center;

    .content {
      width: 1140px;
      padding: 0 20px;

      margin: 0 auto;
      z-index: 2;

      @media (max-width: 1140px) {
        max-width: 1140px;
      }

      &__header {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;

        h2 {
          font-size: 20px;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors.border1};
            right: 0px;
            bottom: -13px;
          }

          &::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors.border1};
            right: 17px;
            bottom: -13px;
          }
        }
      }

      &__chumbi {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 75px;
        padding: 50px 0 100px 0;

        &__chumbi {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          &__img {
            width: 200px;
            position: relative;
            display: flex;
            align-items: flex-end;
            justify-content: center;

            &::before {
              content: "";
              position: absolute;
              background: rgba(0, 0, 0, 0.4);
              border-radius: 100%;
              z-index: -1;

              width: 80%;
              height: 40px;
            }

            &--mini::before {
              width: 60%;
            }

            img {
              width: 100%;
            }
            .mini {
              width: 70%;
            }
          }

          &__attributes {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            &__type,
            &__coat {
              color: ${colors.text2};
              font-size: 13px;
            }
          }

          &__id {
            color: ${colors.text2};
            font-size: 14px;
            margin-top: 10px;

            display: flex;
            align-items: center;
            justify-content: center;

            &__icon {
              margin-right: 5px;
              height: 30px;
            }
          }
        }
      }
    }

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

      @media (max-width: 1064px) {
        white-space: unset;
        text-align: center;
        left: unset;
      }
    }
  `}
`;

export default ViewYourChumbi;
