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
      <Message colors={colors}>
        <div className="center">
          <span className="center__supporting-text">This app is</span>{" "}
          <span className="center__highlight">unmaintained</span>{" "}
          <span className="center__supporting-text">
            and is for demo purposes only
          </span>
        </div>
      </Message>

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

const Message = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    color: ${colors.text2};
    position: absolute;
    font-size: 13px;
    top: 0;
    width: 100%;
    height: 50px;
    /* background: ${colors.bg1}; */
    display: flex;
    align-items: center;

    .center {
      width: 1140px;
      padding: 0 20px;
      margin: 0 auto;

      &__highlight {
        color: ${colors.danger};
        background: ${colors.danger}30;
        padding: 0 5px;
        border: 1px solid ${colors.danger};
        border-radius: 5px;
      }

      @media (max-width: 621px) {
        &__supporting-text {
          display: none;
        }
      }
    }
  `}
`;

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
