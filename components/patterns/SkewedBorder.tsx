import React from "react";
import { ISkewedBorder } from "../../interfaces/patterns/ISkewedBorder";
import styled from "styled-components";
import { useTheme } from "../../contexts/themeContext";

const SkewedBorder: React.FC<ISkewedBorder> = ({ position, bg }) => {
  const { colors } = useTheme();

  const style = {
    bottom: position.includes("bottom") ? 0 : "none",
    left: position.includes("left") ? 0 : "none",
    top: position.includes("top") ? 0 : "none",
    right: position.includes("right") ? -55 : "none",
    transform: "skew(-45deg)",
    background: bg ? bg : "transparent",
    borderLeft: `3px solid ${colors.border1}`,
  };

  return <StyledSkewedBorder style={style}></StyledSkewedBorder>;
};

const StyledSkewedBorder = styled.span`
  position: absolute;
  width: 90px;
  height: 70px;
  background-color: #444;
  z-index: 5;
`;

export default SkewedBorder;
