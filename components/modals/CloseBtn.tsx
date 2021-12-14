import React from "react";
import styled, { css } from "styled-components";
import { ICloseBtn } from "../../interfaces/modals/ICloseBtn";
import { CgClose } from "react-icons/cg";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const CloseBtn: React.FC<ICloseBtn> = ({ onClick }) => {
  const { colors } = useTheme();

  return (
    <StyledBtn onClick={onClick} colors={colors}>
      <CgClose />
    </StyledBtn>
  );
};

const StyledBtn = styled.button<{ colors: IColors }>`
  ${({ colors }) => css`
    background-color: transparent;
    border: none;
    color: ${colors.text3};
    font-size: 25px;

    position: absolute;
    top: 10px;
    right: 10px;
  `}
`;

export default CloseBtn;
