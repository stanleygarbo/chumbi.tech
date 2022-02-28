import { Field } from "formik";
import styled, { css } from "styled-components";
import { IColors } from "../interfaces/IColors";

export const FormikField = styled(Field)<{
  colors: IColors;
  bg: string;
}>`
  ${({ colors, bg }) => css`
    color: ${colors.text1};
    border-radius: 5px;
    transition: 0.2s;
    border: none;
    padding: 12px 10px;
    font-size: 15px;
    outline: none;
    &::placeholder {
      color: ${colors.text2 + "90"};
    }
    background-color: ${bg ? bg : colors.bg1};
    border: 1px solid ${colors.border1};
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
    }

    &:focus {
      border: ${`1px solid ${colors.accent}`};
    }
  `};
`;
