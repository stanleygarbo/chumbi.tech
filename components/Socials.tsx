import React from "react";
import { ISocials } from "../interfaces/ISocials";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Socials: React.FC<ISocials> = ({ isHorizontal }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors} isHorizontal={isHorizontal}>
      <div className="icon">
        <BsTwitter />
      </div>
      <div className="icon">
        <FaFacebookF />
      </div>

      <div className="icon">
        <SiDiscord />
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors; isHorizontal: boolean }>`
  ${({ colors, isHorizontal }) => css`
    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    font-size: 20px;

    .icon {
      margin-bottom: ${isHorizontal ? "0px" : "10px"};
      margin-right: ${isHorizontal ? "10px" : "0px"};
      color: ${colors.text1 + 90};
    }
  `}
`;

export default Socials;
