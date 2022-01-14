import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaWallet } from "react-icons/fa";
import { useWallet } from "../contexts/walletContext";
import { truncate } from "../util/truncate";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import Modal from "react-modal";
import Socials from "./Socials";
import TrackerNav from "./tracker/TrackerNav";

const Nav = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { current, connectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <StyledNav
      colors={colors}
      isHomePage={router.pathname === "/"}
      isTrackerMainPage={router.pathname === "/tracker"}
      isTrackerPage={router.pathname.includes("/tracker/")}
    >
      <div className="nav-wrapper">
        <Link href="/" passHref>
          <div className="nav-wrapper__logo">Chumbi.Tech</div>
        </Link>
        <div className="nav-wrapper__links">
          <ul>
            <li
              className={router.pathname.includes("/tracker") ? "active" : ""}
            >
              <Link href={`/tracker${current ? "/chumbi" : ""}`} passHref>
                Tracker
              </Link>
            </li>
            <li
              className={
                router.pathname.includes("/chumbi-avatar-generator")
                  ? "active"
                  : ""
              }
            >
              <Link href="/chumbi-avatar-generator" passHref>
                Avatar Generator
              </Link>
            </li>
            <li className={router.pathname === "/guides" ? "active" : ""}>
              <Link href="/guides" passHref>
                Guides
              </Link>
            </li>

            <li
              className={router.pathname === "/breeding-guide" ? "active" : ""}
            >
              <Link href="/breeding-guide" passHref>
                Breeding
              </Link>
            </li>

            <li className={router.pathname === "/donate" ? "active" : ""}>
              <Link href="/donate" passHref>
                Donate
              </Link>
            </li>
          </ul>
          <button
            onClick={connectWallet}
            style={{ paddingLeft: current ? 35 : 20 }}
          >
            {current && (
              <div className="wallet-icon">
                <FaWallet fontSize={20} />
              </div>
            )}
            {current ? truncate(current, 10) : "Connect"}
          </button>
        </div>
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoIosMenu />
        </button>
      </div>

      {router.pathname.includes("/tracker/") && <TrackerNav />}
      <Modal
        isOpen={isMenuOpen}
        closeTimeoutMS={200}
        onRequestClose={() => setIsMenuOpen(false)}
        ariaHideApp={false}
      >
        <div className="menu">
          <button
            className="menu__close"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <IoMdClose />
          </button>
          <ul>
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href="/" passHref>
                <a onClick={() => setIsMenuOpen(false)}>Home</a>
              </Link>
            </li>
            <li
              className={router.pathname.includes("/tracker") ? "active" : ""}
            >
              <Link href={`/tracker${current ? "/chumbi" : ""}`} passHref>
                <a onClick={() => setIsMenuOpen(false)}>Tracker</a>
              </Link>
            </li>
            <li
              className={
                router.pathname.includes("/chumbi-avatar-generator")
                  ? "active"
                  : ""
              }
            >
              <Link href="/chumbi-avatar-generator" passHref>
                <a onClick={() => setIsMenuOpen(false)}>Avatar Generator</a>
              </Link>
            </li>
            <li className={router.pathname.includes("/guides") ? "active" : ""}>
              <Link href="/guides" passHref>
                <a onClick={() => setIsMenuOpen(false)}>Guides</a>
              </Link>
            </li>

            <li
              className={router.pathname === "/breeding-guide" ? "active" : ""}
            >
              <Link href="/breeding-guide" passHref>
                <a onClick={() => setIsMenuOpen(false)}>Breeding</a>
              </Link>
            </li>

            <li className={router.pathname === "/donate" ? "active" : ""}>
              <Link href="/donate" passHref>
                <a onClick={() => setIsMenuOpen(false)}>Donate</a>
              </Link>
            </li>
          </ul>

          <div className="menu__socials">
            Follow me on
            <br />
            <br />
            <Socials isHorizontal />
          </div>
        </div>
      </Modal>
    </StyledNav>
  );
};

const StyledNav = styled.nav<{
  colors: IColors;
  isHomePage: boolean;
  isTrackerMainPage: boolean;
  isTrackerPage: boolean;
}>`
  ${({ colors, isHomePage, isTrackerMainPage, isTrackerPage }) => css`
    height: ${isHomePage || isTrackerMainPage ? "140px" : "70px"};

    width: 100%;
    /* background-color: ${colors.bg1}; */
    background-color: "transparent";

    border-bottom: ${isHomePage || isTrackerMainPage || isTrackerPage
      ? "none"
      : `1px solid ${colors.border1}`};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    .nav-wrapper {
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${isTrackerMainPage
        ? css`
            width: 100%;
            padding: 0 40px;
            border: none;
            @media (max-width: 400px) {
              padding: 0 20px;
              height: 75px;
              border-bottom: 1px solid ${colors.border1};
            }
          `
        : css`
            max-width: 1140px;
            padding: 0 20px;
          `};

      &__logo {
        color: #000;
        font-weight: 700;
        position: relative;
        background: #fff;
        padding: 0px 10px;
        cursor: pointer;

        &::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: ${colors.accent};
        }

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          right: -2px;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: ${colors.accent};
        }
      }

      &__links {
        display: flex;
        align-items: center;

        @media (max-width: 781px) {
          display: none;
        }

        ul {
          display: flex;
          li {
            color: ${colors.text2};
            margin-right: 20px;
            &.active {
              a {
                font-weight: 700;
                color: ${colors.text1};
              }
            }
          }
        }

        button {
          border-radius: 100px;
          padding: 5px 20px;
          border: none;
          font-weight: 600;
          background-color: #fff;
          color: #000;

          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;

          .wallet-icon {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            border: 2px solid ${colors.accent};
            background: #fff;

            display: grid;
            place-items: center;
            left: -10px;
          }
        }
      }

      .hamburger {
        font-size: 35px;
        background: none;
        border: none;
        color: ${colors.text1};
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        right: -3px;

        @media (min-width: 782px) {
          display: none;
        }
      }
    }
  `}
`;

export default Nav;
