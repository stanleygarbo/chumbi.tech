import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Socials from "../Socials";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import Modal from "react-modal";
import { MdModeEdit } from "react-icons/md";
import CloseBtn from "../modals/CloseBtn";
import InputModal from "../modals/InputModal";
import { IChumbatarGenerator } from "../../interfaces/chumbatar-generator/IChumbatarGenerator";
import { useRouter } from "next/router";

const ChumbatarGenerator: React.FC<IChumbatarGenerator> = ({ image, id }) => {
  const { colors } = useTheme();
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [res, setRes] = useState<number>(500);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chumbiID, setChumbiID] = useState<number>(id);
  const router = useRouter();

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

      // externalImage.src = `https://storage.googleapis.com/assets.axieinfinity.com/axies/${chumbiID}/axie/axie-full-transparent.png`;
      externalImage.src = image;
      console.log(image);
      externalImage.onload = function () {
        console.log("loaded");
        ctx.drawImage(externalImage, 0, 0, canvas.width, canvas.height);
        setImgURL(canvas.toDataURL());
        setIsImgLoaded(true);
      };
    }
  }, [res, chumbiID, image]);

  return (
    <Container colors={colors}>
      <div className="wrapper">
        <div className="wrapper__preview">
          <div className="wrapper__preview__socials">
            <Socials isHorizontal={false} />
          </div>
          <canvas width={res} height={res} ref={canvasRef}></canvas>
          {isImgLoaded ? (
            <img className="wrapper__preview__avatar" src={imgURL} alt="img" />
          ) : (
            <div className="wrapper__preview__loading">
              {/* <CircularLoader size="large" /> */}
              <img src="/dots-loader-accent.svg" alt="" style={{ width: 40 }} />
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
            router.push(`/chumbi-avatar-generator/${id}`);
            setChumbiID(id);
          }}
        />
      </Modal>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    max-width: 1140px;
    margin: 0 auto;

    h1 {
      font-size: 18px;
      margin-top: 20px;
      color: ${colors.text1};
    }

    .wrapper {
      display: grid;
      grid-template-columns: 550px 1fr;
      padding: 50px 20px 0 20px;

      &__preview {
        display: flex;
        align-items: flex-start;
        canvas {
          display: none;
        }

        &__socials {
          margin-left: -10px;
        }

        &__avatar,
        &__loading {
          width: 400px;
          height: 400px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          margin-left: 40px;
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

        &__btns {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        &__btn {
          padding: 2px 10px;
          border-radius: 5px;
          font-weight: 500;
          background-color: ${colors.bg1};
          border: 1px solid ${colors.text1 + 20};
          color: ${colors.text2};
        }

        &__chumbi-id {
          display: flex;
          align-items: center;
        }

        &__name {
          font-size: 15px;
          font-weight: 500;
        }

        &__download {
          padding: 10px 40px;
          border-radius: 5px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
          border: none;
          background-color: ${colors.accent2};
          color: #ffffff;
          font-weight: 600;
          margin-top: 20px;
        }
      }

      @media (max-width: 836px) {
        grid-template-columns: 450px 1fr;

        &__preview {
          &__avatar,
          &__loading {
            width: 300px;
            height: 300px;
          }
        }
      }

      @media (max-width: 717px) {
        grid-template-columns: 400px 1fr;

        &__preview {
          &__avatar,
          &__loading {
            margin-left: 0px;
          }
        }
      }

      @media (max-width: 697px) {
        grid-template-columns: 360px 1fr;
        padding: 20px;

        &__preview {
          &__socials {
            display: none;
          }
        }
      }
      @media (max-width: 630px) {
        grid-template-columns: 1fr;

        &__preview {
          &__avatar,
          &__loading {
            position: relative;
            display: flex;
            justify-content: center;

            width: 100%;
            height: unset;

            &::before {
              content: "";
              display: block;
              padding-top: 100%;
              /* initial ratio of 1:1*/
            }
          }
        }

        &__options {
          margin-top: 20px;

          &__download {
            width: 100%;
          }
        }
      }
    }
  `}
`;

export default ChumbatarGenerator;
