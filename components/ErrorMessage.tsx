import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";
import { IErrorMessage } from "../interfaces/IErrorMessage";

const ErrorMessage: React.FC<IErrorMessage> = ({ status, style, message }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors} style={style}>
      <h1 className="error-number">{status}</h1>
      <div className="error-message">{message}</div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .error-number {
      color: ${colors.text1};
    }
    .error-message {
      color: ${colors.text2};
      margin-left: 20px;
      padding: 20px 0 20px 20px;
      border-left: 1px solid ${colors.border1};
    }
  `}
`;

export default ErrorMessage;
