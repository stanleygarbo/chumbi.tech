import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IAvatar } from "../../interfaces/avatar-generator/IAvatar";
import { IColors } from "../../interfaces/IColors";
import { getMaleAvatarSVGString } from "../../util/getMaleAvatarSVGString";

const MaleAvatar: React.FC<IAvatar> = ({
  eyes,
  skin,
  coat,
  coatTrim,
  hair,
}) => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [isBGLoaded, setIsBGLoaded] = useState<boolean>(false);
  const [res, setRes] = useState<number>(1500);
  const { colors } = useTheme();

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas?.getContext("2d");
    if (canvas && context) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        getMaleAvatarSVGString({ eyes, skin, coat, coatTrim, hair }),
        "image/svg+xml"
      );

      const svg = doc;

      let clonedSvgElement: any = svg.documentElement.cloneNode(true);
      const divisor = 1.5;
      let width = res / 1.62 / divisor,
        height = res / divisor;

      let outerHTML = clonedSvgElement.outerHTML,
        blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });

      let URL = window.URL || window.webkitURL || window;
      let blobURL = URL.createObjectURL(blob);

      const image = new Image();
      image.onload = function () {
        // draw image in canvas starting left-0 , top - 0
        if (context && canvas) {
          context.drawImage(image, res * 0.3, res * 0.2, width, height);
          setImgURL(canvas.toDataURL());
        }
        //  downloadImage(canvas); need to implement
      };
      image.src = blobURL;

      const bgImg = new Image();
      bgImg.onload = function () {
        if (!isBGLoaded) {
          if (context && canvas) {
            context.drawImage(bgImg, res * -0.4, 0, res * 1.5, res);

            context.beginPath();
            context.ellipse(
              res * 0.505,
              res * 0.83,
              res * 0.08,
              res * 0.2,
              Math.PI / 2,
              0,
              2 * Math.PI
            );
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fill();

            setIsBGLoaded(true);
          }
        }
      };
      bgImg.src = "/chumbi-bg.jpg";
    }
  }, [canvasRef, eyes, skin, coat, coatTrim, hair, isBGLoaded, res]);

  return (
    <Container colors={colors}>
      <canvas width={res} height={res} ref={canvasRef}></canvas>
      <a href={imgURL} download>
        <button className="wrapper__options__download">DOWNLOAD</button>
      </a>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    position: sticky;
    top: 20px;
    z-index: 5;
    display: flex;
    flex-direction: column;

    @media (max-width: 760px) {
      position: unset;
    }

    canvas {
      background: #fff;
      /* display: none; */
      width: 400px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

      @media (max-width: 440px) {
        width: 100%;
      }
    }

    img {
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    button {
      padding: 10px 40px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
      border: none;
      background-color: ${colors.accent2};
      color: #ffffff;
      font-weight: 600;
      margin-top: 20px;
      width: 100%;

      transition: 0.15s;

      @media (max-width: 440px) {
        position: fixed;
        bottom: 20px;
        width: calc(100% - 40px);
      }

      &:hover {
        opacity: 0.75;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  `}
`;

export default MaleAvatar;
