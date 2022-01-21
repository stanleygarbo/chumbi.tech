import Image from "next/image";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const types = [
  [
    "neutral",
    "forest",
    "cave",
    "flame",
    "river",
    "mountain",
    "spark",
    "insect",
  ],
  ["feather", "crystal", "frost", "flower"],
  ["creature", "spirit"],
  ["void"],
];

const BreedingTree = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <section>
        {types.map((tier, tierIdx) => (
          <div key={tierIdx} className="tier">
            <div className="tier__no">tier {tierIdx + 1}</div>
            {tier.map((type, typeIdx) => (
              <div key={typeIdx} className="tier__type">
                {tierIdx > 0 && (
                  <div
                    style={{
                      height: `${
                        tierIdx === 1 ? 100 : tierIdx === 2 ? 180 : 350
                      }px`,
                    }}
                    className="tier__type__edges"
                  >
                    <div className="tier__type__edges__point"></div>
                  </div>
                )}

                {/* <div className="tier__type__icon"> */}
                {/* <img
                  className="tier__type__icon"
                  src={`/tier-${tierIdx + 1}/${type}.png`}
                  alt=""
                /> */}
                <Image
                  src={`/types/${type}.png`}
                  height={70}
                  alt=""
                  width={70}
                />
                {/* </div> */}
                <div className="tier__type__name">{type}</div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    section {
      display: flex;
      padding-top: 50px;
      padding-left: 20px;
      padding-right: 20px;

      .tier {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: relative;
        border-radius: 10px;

        &__no {
          position: absolute;
          top: -50px;
          width: 100%;
          text-align: center;
          color: ${colors.text1};
          border: 1px solid ${colors.border1};
          border-radius: 3px;
          text-transform: capitalize;
          font-size: 15px;
        }

        & ~ * {
          margin-left: 70px;
        }

        &__type {
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &__edges {
            width: 10px;
            border-right: 2px solid ${colors.border1};
            position: absolute;
            left: -40px;
            display: flex;
            align-items: center;

            &::before,
            &::after,
            &__point {
              position: absolute;
              content: "";
              width: 18px;
              height: 0px;

              border-top: 2px solid ${colors.border1};
            }
            &::before {
              top: 0px;
              left: -8px;
            }

            &::after {
              bottom: 0px;
              left: -8px;
            }

            &__point {
              right: -18px;
            }
          }

          &__icon {
            width: 70px;
            height: 70px;
          }
          &__name {
            color: ${colors.text2};
            position: relative;
            top: -5px;
            text-transform: capitalize;
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
    }

    @media (max-width: 560px) {
      height: 500px;
      display: flex;
      align-items: center;
      section {
        padding-left: 0px;
        padding-right: 0px;
        .tier {
          transform: scale(0.63, 0.63);

          & ~ * {
            margin-left: 25px;
          }
        }
      }
    }
    @media (max-width: 380px) {
      section {
        .tier {
          & ~ * {
            margin-left: 25px;
          }
        }
      }
    }
  `}
`;

export default BreedingTree;
