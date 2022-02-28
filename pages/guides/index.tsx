import type { NextPage } from "next";
import Head from "next/head";
import styled, { css } from "styled-components";
import ComingSoon from "../../components/ComingSoon";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const Custom404: NextPage = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors} className="hero">
      {/* <img src="/gradient.png" alt="" /> */}

      <Head>
        <title>A guide to Chumbi Valley | Chumbi Technologies</title>
        <meta
          name="description"
          content="A beginner's guide to chumbi valley. 
          Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
