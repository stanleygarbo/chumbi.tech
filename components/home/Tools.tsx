import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import SkewedRect from "../patterns/SkewedRect";
// import { CgTrack } from "react-icons/cg";
// import { AiOutlinePicture } from "react-icons/ai";
import Button from "../Button";

const Tools = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="tools">
        <div className="tools__title">
          <SkewedRect>TOOLS</SkewedRect>
        </div>
        <div className="tools__cards">
          <div className="tools__cards__card">
            <div className="tools__cards__card__icon">
              <h2>Tracker</h2>
              <p>Keep track of your chumbi and fostership earnings.</p>
              {/* <CgTrack /> */}
              <Button>Open</Button>
            </div>
          </div>
          <div className="tools__cards__card">
            <div className="tools__cards__card__icon">
              {/* <AiOutlinePicture /> */}

              <h2>Avatar Generator</h2>
              <p>Get a chumbatar just by pasting a particular chumbi's ID.</p>
              <Button>Open</Button>
            </div>
          </div>

          <div className="tools__cards__card">
            <div className="tools__cards__card__icon">
              {/* <AiOutlinePicture /> */}

              <h2>Breeding Guide</h2>
              <p>
                Learn which chumbi you will get when breeding certain types.
              </p>
              <Button>Open</Button>
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

    .tools {
      max-width: 1100px;
      /* min-height: 100vh; */
      /* border-left: 1px solid ${colors.accent}; */
      margin: 0 auto;
      position: relative;

      &__title {
        margin-left: 40px;
      }

      &__cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 80px 0px;

        h2 {
          color: ${colors.text1};
        }

        p {
          color: ${colors.text2};
          margin: 30px 0px;
        }

        &__card {
          padding: 20px 50px 20px 50px;
          border-left: 2px solid ${colors.border1};
          width: 370px;
        }
      }
    }
  `}
`;

export default Tools;
