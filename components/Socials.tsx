import React from "react";
import { ISocials, IRawSocials } from "../interfaces/ISocials";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Socials: React.FC<ISocials> = ({
  isHorizontal,
  colored,
  iconSize,
  rawSocialsStyle,
  socialsStyle,
  showTitle,
  showBorders,
}) => {
  const { colors } = useTheme();

  if (showTitle)
    return (
      <SocialsContainer style={socialsStyle} colors={colors}>
        <div className="msg">
          <img src="/text-decor-left.png" alt="" height={15} />
          <span>Follow me on</span>
          <img src="/text-decor-right.png" alt="" height={15} />
        </div>
        <RawSocials
          showBorders={showBorders}
          isHorizontal={isHorizontal}
          colored={colored}
          iconSize={iconSize}
          style={rawSocialsStyle}
        />
      </SocialsContainer>
    );

  return (
    <RawSocials
      showBorders={showBorders}
      isHorizontal={isHorizontal}
      colored={colored}
      iconSize={iconSize}
      style={rawSocialsStyle}
    />
  );
};

const SocialsContainer = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .msg {
      color: ${colors.text2};
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin: 0 10px;
      }
    }
  `}
`;

const RawSocials: React.FC<IRawSocials> = ({
  isHorizontal,
  colored,
  iconSize,
  style,
  showBorders,
}) => {
  const { colors } = useTheme();

  return (
    <RawSocialsContainer
      colors={colors}
      isHorizontal={isHorizontal}
      iconSize={iconSize}
      style={style}
    >
      <a target="blank" href="https://twitter.com/digital_mad_lad">
        <div
          className={`icon ${colored && "tw colored"} ${
            showBorders && "showBorders"
          }`}
        >
          <BsTwitter />
        </div>
      </a>

      <a target="blank" href="https://www.facebook.com/vangeance.gg">
        <div
          className={`icon ${colored && "fb colored"} ${
            showBorders && "showBorders"
          }`}
        >
          <BsFacebook />
        </div>
      </a>

      <a target="blank" href="https://discord.com/users/756368831944982599">
        <div
          className={`icon ${colored && "dc colored"} ${
            showBorders && "showBorders"
          }`}
        >
          <SiDiscord />
        </div>
      </a>
    </RawSocialsContainer>
  );
};

const RawSocialsContainer = styled.div<{
  colors: IColors;
  isHorizontal: boolean;
  iconSize?: number;
}>`
  ${({ colors, isHorizontal, iconSize }) => css`
    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    font-size: ${iconSize ? iconSize + "px" : "20px"};
    justify-content: space-between;

    a {
      color: ${colors.text2 + "99"};
    }
    .icon {
      /* margin-bottom: ${isHorizontal ? "0px" : "10px"};
      margin-right: ${isHorizontal ? "40px" : "0px"}; */
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      transition: 0.2s;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid ${colors.border1};
      }
    }

    .colored {
      color: ${colors.accent};
    }

    .showBorders {
      border-left: 1px solid ${colors.border1};
      border-right: 1px solid ${colors.border1};
    }

    /* .tw {
      color: #03a9f4;
    }
    .fb {
      color: #1877f2;
    }
    .dc {
      color: #5865f2;
    } */
  `}
`;

export default Socials;
