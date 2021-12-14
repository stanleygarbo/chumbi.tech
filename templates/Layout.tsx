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
    <div>
      <Head>
        <meta name="theme-color" content={colors.bg1} />
      </Head>
      <GlobalStyles isHomePage={pathname === "/"} colors={colors} />
      <Nav />
      {pathname === "/" && <div className="shadow"></div>}
      {pathname !== "/" ? <div className="wrapper">{children}</div> : children}
      <Footer />
    </div>
  );
};

const GlobalStyles = createGlobalStyle<{
  colors: IColors;
  isHomePage: boolean;
}>`
${({ colors, isHomePage }) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  body {
    background: ${isHomePage ? "url(chumbi-banner.png)" : colors.bg1};
    min-height: 100vh;

    background-size: cover;
    background-position: center;
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

  .wrapper {
    padding-top: 100px;
    max-width: 1100px;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  .ReactModal__Overlay {
    opacity: 0;
    /* transform: translateX(-100px); */
    transition: all 200ms ease-in-out;
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

    display: grid;
    place-items: center;
  }

  .ReactModal__Content {
    display: grid;
    place-items: center;
    position: relative !important;
    background-color: ${colors.bg1} !important;
    border: none !important;
    inset: 0px !important;
    width: fit-content !important;
    height: fit-content !important;
  }
`}

`;
