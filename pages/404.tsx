import type { NextPage } from "next";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Custom404: NextPage = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="error">
        <div className="error__number">404</div>
        <h2 className="error__message">
          Are you lost baby girl? Page not found.
        </h2>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    height: calc(100vh - 162px);
    width: 100%;
    display: grid;
    place-items: center;

    .error {
      display: flex;
      align-items: center;

      &__number {
        font-size: 25px;
        margin-right: 20px;
        padding: 10px 20px 10px 0px;
        border-right: 2px solid ${colors.border1};
        color: ${colors.text2};
      }
      &__message {
        font-size: 15px;
        color: ${colors.text2};
        font-weight: 400;
      }
    }
  `}
`;

export default Custom404;
