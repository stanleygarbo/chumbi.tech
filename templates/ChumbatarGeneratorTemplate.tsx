import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import CircularLoader from "../components/CircularLoader";
import Socials from "../components/Socials";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";
import Modal from "react-modal";
import { MdModeEdit } from "react-icons/md";
import CloseBtn from "../components/modals/CloseBtn";
import InputModal from "../components/modals/InputModal";

const ChumbatarGeneratorTemplate = () => {
  const { colors } = useTheme();
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [res, setRes] = useState<number>(500);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [chumbiID, setChumbiID] = useState<number>(6555088);

  const activeBtnStyles = {
    background: colors.accent + 20,
    border: `1px solid ${colors.accent}`,
    color: colors.accent,
  };

  useEffect(() => {
    setIsImgLoaded(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    // make square
    if (ctx && canvas) {
      const bgImg = new Image();
      bgImg.onload = function () {
        // ctx.fillStyle = colors.accent + "30";
        // ctx.fillRect(0, 0, res, res);
        ctx.drawImage(bgImg, res * -0.4, 0, res * 1.5, res);
      };
      bgImg.src = "/chumbi-bg.jpg";

      // add image on top
      const externalImage = new Image();
      externalImage.crossOrigin = "anonymous";
      //https://storage.googleapis.com/assets.axieinfinity.com/axies/${chumbiID}/axie/axie-full-transparent.png

      externalImage.src = `https://storage.googleapis.com/assets.axieinfinity.com/axies/${chumbiID}/axie/axie-full-transparent.png`;
      externalImage.onload = function () {
        console.log("loaded");
        ctx.drawImage(
          externalImage,
          0,
          res * 0.15,
          canvas.width,
          (canvas.width / 1.8) * 1.4
        );
        setImgURL(canvas.toDataURL());
        setIsImgLoaded(true);
      };
    }
  }, [res, chumbiID]);

  return (
    <Container colors={colors}>
      <div className="wrapper">
        <div className="wrapper__preview">
          <Socials isHorizontal={false} />
          <canvas width={res} height={res} ref={canvasRef}></canvas>
          {isImgLoaded ? (
            <img src={imgURL} alt="img" />
          ) : (
            <div className="wrapper__preview__loading">
              <CircularLoader size="large" />
            </div>
          )}
        </div>
        <div className="wrapper__options">
          <h2>Options</h2>
          <div className="wrapper__options__name">Resolution</div>
          <div className="wrapper__options__btns">
            <button
              className="wrapper__options__btn"
              style={res === 500 ? activeBtnStyles : {}}
              onClick={() => setRes(500)}
            >
              500px × 500px
            </button>
            <button
              className="wrapper__options__btn"
              style={res === 750 ? activeBtnStyles : {}}
              onClick={() => setRes(750)}
            >
              750px × 750px
            </button>
            <button
              className="wrapper__options__btn"
              style={res === 1000 ? activeBtnStyles : {}}
              onClick={() => setRes(1000)}
            >
              1000px × 1000px
            </button>
          </div>
          <div className="wrapper__options__name">Chumbi ID</div>
          <button
            className="wrapper__options__btn wrapper__options__chumbi-id"
            onClick={() => setIsModalOpen(true)}
          >
            {chumbiID} <MdModeEdit style={{ marginLeft: 5 }} />
          </button>
          <div className="wrapper__options__id"></div>
          <a href={imgURL} download>
            <button className="wrapper__options__download">DOWNLOAD</button>
          </a>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeTimeoutMS={200}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <CloseBtn onClick={() => setIsModalOpen(false)} />
        <InputModal
          title="Find your Chumbi"
          onSubmit={(id) => {
            setIsModalOpen(false);
            setChumbiID(id);
          }}
        />
      </Modal>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    h1 {
      font-size: 18px;
      margin-top: 20px;
      color: ${colors.text1};
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-top: 20px;
      padding-bottom: 100px;

      &__preview {
        display: flex;
        canvas {
          display: none;
        }

        img,
        &__loading {
          width: 400px;
          height: 400px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          margin-left: 30px;
          border-radius: 5px;

          display: grid;
          place-items: center;
        }
      }

      &__options {
        color: ${colors.text2};

        &__name {
          margin-top: 20px;
          margin-bottom: 5px;
        }

        &__btn {
          padding: 2px 10px;
          border-radius: 5px;
          font-weight: 500;
          margin-right: 10px;
          background-color: ${colors.bg1};
          border: 1px solid ${colors.text1 + 20};
          color: ${colors.text2};
        }

        &__chumbi-id {
          display: flex;
          align-items: center;
        }

        h2 {
          font-size: 17px;
          color: ${colors.text1};
          margin-bottom: 10px;
        }

        &__name {
          font-size: 15px;
          font-weight: 500;
        }

        &__download {
          padding: 10px 40px;
          border-radius: 100px;
          border: none;
          background-color: ${colors.accent};
          color: #ffffff;
          font-weight: 600;
          margin-top: 20px;
        }
      }
    }
  `}
`;

export default ChumbatarGeneratorTemplate;
