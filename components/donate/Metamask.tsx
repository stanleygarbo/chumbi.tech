import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useTheme } from "../../contexts/themeContext";
import styled, { css } from "styled-components";
import { IColors } from "../../interfaces/IColors";
import Image from "next/image";
import { BsClipboard } from "react-icons/bs";
import copy from "copy-to-clipboard";

const my_metamask_address = "0xe1E362fc8984c9E550eF52C8d03Ca41987A9E4Ff";

const Metamask: React.FC = () => {
  const { colors } = useTheme();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const onAddressClicked = async () => {
    try {
      copy(my_metamask_address);
      setIsCopied(true);
      setErr("");
    } catch (err) {
      if (err instanceof Error) {
        setErr(err.message);
      }
    }
  };

  return (
    <Container colors={colors} isCopied={isCopied} err={!!err}>
      <h1>
        <Image src="/icons/metamask-fox.svg" width={30} height={30} alt="" />{" "}
        &nbsp; Donate
      </h1>

      <div className="qr">
        <QRCode
          value={my_metamask_address}
          bgColor={colors.bg1}
          fgColor={colors.text1 + "bf"}
          size={250}
          includeMargin
          renderAs="svg"
        />
      </div>

      <div className="blockchains">
        <div className="blockchains__eth blockchains__chain">
          <Image src="/icons/eth.webp" width={25} height={25} alt="" />
        </div>
        <div className="blockchains__bsc blockchains__chain">
          <Image src="/icons/bsc.svg" width={25} height={25} alt="" />
        </div>
        <div className="blockchains__polygon blockchains__chain">
          <Image src="/icons/polygon.svg" width={25} height={25} alt="" />
        </div>
      </div>

      <div className="wallet" onClick={onAddressClicked}>
        <div className="wallet__address">
          0xe1E362fc8984c9E550eF52C8d03Ca41987A9E4Ff
          <div className="wallet__address__clipboard">
            <BsClipboard />
          </div>
        </div>

        <p>{err ? err : isCopied ? "Copied!" : "Click to copy"}</p>
      </div>
    </Container>
  );
};

const Container = styled.div<{
  colors: IColors;
  isCopied: boolean;
  err: boolean;
}>`
  ${({ colors, isCopied, err }) => css`
    margin: 0 auto;
    width: fit-content;
    padding: 50px 0;

    h1 {
      color: ${colors.text1};
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 25px;

      margin: 0 auto;
      margin-bottom: 20px;
      padding: 0px 20px 13px 20px;
      /* border-bottom: 1px solid ${colors.accent}; */
      width: fit-content;
    }

    .qr {
      border-image: linear-gradient(
        to bottom,
        ${colors.border1} 25%,
        transparent 25%,
        transparent 75%,
        ${colors.border1} 75%
      );
      border-image-slice: 1;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      border-radius: 100%;

      display: grid;
      place-items: center;

      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: inherit;
        transform: rotate(90deg);
      }

      &::after {
        content: "";
        position: absolute;
        width: 125%;
        height: 15px;
        background-color: ${colors.border1 + "30"};
      }
    }

    .blockchains {
      display: flex;
      justify-content: space-around;

      &__chain {
        height: 40px;
        width: 40px;
        margin-top: 20px;
        /* background-color: #fff; */
        border-radius: 100%;
        border-left: 1px solid ${colors.border1};
        border-right: 1px solid ${colors.border1};
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;

        display: grid;
        place-items: center;
      }
    }

    .wallet {
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      display: flex;
      flex-direction: column;
      align-items: center;

      &__address {
        width: 250px;
        padding: 10px;
        border-radius: 5px;
        margin-top: 20px;

        background: ${colors.bg4};
        color: ${colors.text2};
        font-size: 13px;
        word-break: break-all;
        text-align: center;

        position: relative;

        display: flex;
        align-items: center;

        &__clipboard {
          position: absolute;
          right: -20px;
          color: ${colors.text2};
        }
      }

      &:hover {
        .wallet__address__clipboard {
          color: ${colors.accent};
        }

        p {
          color: ${err
            ? colors.danger
            : isCopied
            ? colors.success
            : colors.accent};
        }
      }

      p {
        color: ${err
          ? colors.danger
          : isCopied
          ? colors.success
          : colors.text2 + "90"};
        font-size: 12px;
        text-align: center;
        margin-top: 5px;
        white-space: break-spaces;
        max-width: 200px;
      }
    }
  `}
`;

export default Metamask;
