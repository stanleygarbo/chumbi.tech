import type { NextPage } from "next";
import styled, { css } from "styled-components";
import ComingSoon from "../../components/ComingSoon";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const Custom404: NextPage = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors} className="hero">
      {/* <img src="/gradient.png" alt="" /> */}
      <ComingSoon />
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    /* height: calc(100vh - 60px); */
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      z-index: -1;
    }
  `}
`;

export default Custom404;
