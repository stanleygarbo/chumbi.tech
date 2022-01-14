import React from "react";
import styled, { css } from "styled-components";
import { IButton } from "../interfaces/IButton";
import { IoIosArrowForward } from "react-icons/io";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Button: React.FC<IButton> = ({ children, onClick, style }) => {
  const { colors } = useTheme();

  return (
    <StyledBtn onClick={onClick} colors={colors} style={style}>
      <div className="btn-icon">
        <IoIosArrowForward />
      </div>

      {children}
    </StyledBtn>
  );
};

const StyledBtn = styled.button<{ colors: IColors }>`
  ${({ colors }) => css`
    background: transparent;
    border: none;
    color: ${colors.text2};

    display: flex;
    align-items: center;

    text-transform: uppercase;
    font-weight: 600;

    .btn-icon {
      width: 30px;
      height: 30px;
      border: 2px solid ${colors.accent};
      border-radius: 100%;
      font-size: 20px;

      display: grid;
      place-items: center;
      padding-left: 2px;
      margin-right: 5px;
    }
  `}
`;

export default Button;
