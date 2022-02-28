import { useTheme } from "../contexts/themeContext";
import Head from "next/head";
import { createGlobalStyle, css } from "styled-components";
import { IColors } from "../interfaces/IColors";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export const Layout: React.FC = ({ children }) => {
  const { colors } = useTheme();
  const { pathname } = useRouter();

  useEffect(() => {
    // Modern DApp Browsers
  }, []);

  return (
    <>
      <Head>
        <meta name="theme-color" content={colors.bg1} />
      </Head>
      <GlobalStyles
        isHomePage={pathname === "/" || pathname === ""}
        colors={colors}
      />
      <Nav />
      {pathname === "/" && <div className="shadow"></div>}
      {children}
      <Footer />
    </>
  );
};

const GlobalStyles = createGlobalStyle<{
  colors: IColors;
  isHomePage: boolean;
}>`
${({ colors, isHomePage }) => css`
  html {
    --color-rare: #00bf4b;
    --color-epic: #09b7fa;
    --color-legendary: #fb9d05;
    --color-mythic: #bc35de;

    /* tier 1 colors */
    --color-neutral: #eaeaea;
    --color-forest: #63ad62;
    --color-cave: #6f5c51;
    --color-flame: #e8745d;
    --color-river: #01a7c1;
    --color-mountain: #a97929;
    --color-spark: #f7d54d;
    --color-insect: #98a84f;

    /* tier 2 colors */
    --color-feather: #e38754;
    --color-crystal: #843c85;
    --color-frost: #9dc9e6;
    --color-flower: #d17aa2;

    /* tier 3 colors */
    --color-creature: #0b7166;
    --color-spirit: #1e3b67;

    /* tier 4 colors */
    --color-void: #000000;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  body {
    background: ${!isHomePage && colors.bg1};
    min-height: calc(100vh);
    position: relative;

    background-size: cover;
    background-position: center;
    overflow-x: hidden;
    width: 100vw;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.bg2};
  }

  .hero {
    padding-top: ${isHomePage ? "0px" : "70px"};
  }

  .tracker {
    padding-top: 100px;
  }

  .type-and-coat {
    color: #fff;
    font-size: 11px;
    border-radius: 50px;
    padding: 1px 10px;
  }

  .neutral {
    background: var(--color-neutral);
    color: #000;
  }
  .forest {
    background: var(--color-forest);
  }
  .cave {
    background: var(--color-cave);
  }
  .flame {
    background: var(--color-flame);
  }
  .river {
    background: var(--color-river);
  }
  .mountain {
    background: var(--color-mountain);
  }
  .spark {
    background: var(--color-spark);
  }
  .insect {
    background: var(--color-insect);
  }

  .feather {
    background: var(--color-feather);
  }
  .crystal {
    background: var(--color-crystal);
  }
  .frost {
    background: var(--color-frost);
  }
  .flower {
    background: var(--color-flower);
  }

  .creature {
    background: var(--color-creature);
  }
  .spirit {
    background: var(--color-spirit);
  }

  .void {
    background: var(--color-void);
  }

  .rare {
    background: var(--color-rare);
  }
  .epic {
    background: var(--color-epic);
  }
  .legendary {
    background: var(--color-legendary);
  }
  .mythic {
    background: var(--color-mythic);
  }

  h2 {
    font-size: 17px;
    color: ${colors.text1};
    margin-bottom: 10px;
  }

  .shadow {
    width: 100%;
    height: 200px;

    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  button {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  ul {
    list-style-type: none;
    font-size: 14px;

    li {
      a {
        text-decoration: none;
        color: ${colors.text2};
      }
    }
  }

  .small-title {
    text-transform: uppercase;
    color: ${colors.text2};
    font-size: 12px;
    font-weight: 500;
  }

  .big-value {
    color: ${colors.text1};
    font-size: 20px;
    font-weight: 600;
    margin-top: 5px;
  }

  @media (max-width: 410px) {
    .small-title {
      font-size: 9px;
    }

    .big-value {
      font-size: 14px;
    }
  }

  .ReactModal__Body--open {
    overflow: hidden !important;
  }

  .ReactModal__Overlay {
    opacity: 0;
    /* transform: translateX(-100px); */
    transition: all 200ms ease-in-out;
    z-index: 20;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
    /* transform: translateX(0px); */
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
    /* transform: translateX(-100px); */
  }

  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5) !important;
    backdrop-filter: blur(20px) !important;
    height: 100% !important;

    display: grid;
    place-items: center;
  }

  .ReactModal__Content {
    display: grid;
    place-items: center;
    position: relative !important;
    background-color: transparent !important;
    border: none !important;
    inset: 0px !important;
    width: fit-content !important;
    padding: 0px !important;
    border-radius: 0px !important;
    margin: 0px 20px !important;

    .menu {
      width: 100vw;
      height: 100vh;
      position: relative;

      background-image: url("/lines.svg");

      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: ${colors.bg1};

      &__close {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        right: 30px;
        background: ${colors.danger};
        font-size: 30px;
        color: #fff;
        border: none;
        border-radius: 100%;
        display: grid;
        place-items: center;
      }

      ul {
        padding: 70px 30px;

        li {
          margin-bottom: 20px;
          &.active {
            a {
              font-weight: 700;
              color: ${colors.text1};
            }
          }
        }

        a {
          font-size: 20px;
          display: block;
        }
      }
      &__socials {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 70px;
        color: ${colors.text2};
        text-align: center;
      }
    }
  }
  .spinner-icon {
    background-image: url("/dots-loader-accent.svg") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;

    width: 25px !important;
    height: 25px !important;
    border: none !important;
    animation: none !important;
  }
`}

`;
