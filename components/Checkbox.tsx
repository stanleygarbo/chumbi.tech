import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const StyledLabel = styled.label<{ bg?: string; colors: IColors }>`
  ${({ colors, bg }) => css`
    position: relative;
    display: flex;
    align-items: center;
    height: 15px;
    padding-left: 5px;
    input {
      position: relative;
      cursor: pointer;
      border: 1px solid transparent;

      &[type="checkbox"]::before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: ${bg ? bg : colors.text1};
        top: -3px;
        left: 0;
        border: 2px solid ${colors.border1};
        transition: 0.2s;
      }
      &[type="checkbox"]:hover::before {
        border: 2px solid ${colors.accent};
      }
      &[type="checkbox"]:checked::before {
        border: 2px solid ${colors.accent};
        background-color: ${colors.accent};
        box-shadow: 0px 0px 0px 4px ${colors.accent}50;
      }
      &[type="checkbox"]::after {
        content: "";
        position: absolute;
        width: 4px;
        height: 9px;
        border-bottom: 2px solid ${colors.text1};
        border-right: 2px solid ${colors.text1};
        transform: rotate(45deg);
        top: 0px;
        left: 7px;
        transition: 0.2s;
        opacity: 0;
      }
      &[type="checkbox"]:checked::after {
        opacity: 1;
      }
    }
    .label {
      padding-left: 15px;
      user-select: none;
      color: ${colors.text2};
      font-size: 12px;
    }
  `}
`;

export interface CheckBoxInterface {
  withLabel?: boolean;
  label?: string;
  bg?: string;
  style?: React.CSSProperties;
  checkHandler?: () => void;
  checked?: boolean;
}

export const CheckBox: React.FC<CheckBoxInterface> = ({
  withLabel,
  label,
  checkHandler,
  style,
  checked,
  bg,
}) => {
  const { colors } = useTheme();

  return (
    <StyledLabel colors={colors} style={style} bg={bg}>
      <input checked={checked} type="checkbox" onClick={checkHandler} />
      {withLabel && <span className="label">{label}</span>}
    </StyledLabel>
  );
};
