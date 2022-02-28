import type { NextPage } from "next";
import Head from "next/head";
import styled, { css } from "styled-components";
import ViewYourChumbi from "../components/home/ViewYourChumbi";
import Hero from "../components/home/Hero";
import Others from "../components/home/Others";
import Tools from "../components/home/Tools";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Home: NextPage = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <Container colors={colors} isDarkMode={isDarkMode}>
      <Head>
        <title>
          Chumbi Valley tools and resources for beginners | Chumbi Technologies
        </title>
        <meta
          name="description"
          content="Chumbi Technologies is a dedicated information site to Chumbi Valley. 
          Use our tools and guides. Chumbi tracker, $CHMB staking tracker, avatar generator, 
          guides, Chumbi Explorer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Tools />
        <ViewYourChumbi />
        <Others />
      </main>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors; isDarkMode: boolean }>`
  ${({ colors, isDarkMode }) => css`
    width: 100%;
    main {
      width: 100%;
      /* background-color: #021f1c; */
      background-color: ${isDarkMode ? colors.bg2 : colors.bg1};
    }
  `}
`;

export default Home;
