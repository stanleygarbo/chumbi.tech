import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";
import Link from "next/link";
import { useRouter } from "next/router";
import { lightThemeColors } from "../theme/colors";

const Nav = () => {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <StyledNav colors={colors} isHomePage={router.pathname === "/"}>
      <div className="nav-wrapper">
        <div className="nav-wrapper__logo">Chumbi.Tech</div>
        <div className="nav-wrapper__links">
          <ul>
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href="/">Tracker</Link>
            </li>
            <li
              className={
                router.pathname === "/chumbi-avatar-generator" ? "active" : ""
              }
            >
              <Link href="/chumbi-avatar-generator">Avatar Generator</Link>
            </li>
            <li className={router.pathname === "/guides" ? "active" : ""}>
              <Link href="/">Guides</Link>
            </li>

            <li className={router.pathname === "/guides" ? "active" : ""}>
              <Link href="/">Donate</Link>
            </li>
          </ul>
          <button onClick={toggleDarkMode}>
            {!isDarkMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav<{ colors: IColors; isHomePage: boolean }>`
  ${({ colors, isHomePage }) => css`
    height: ${isHomePage ? "100px" : "70px"};
    width: 100%;
    /* background-color: ${colors.bg1}; */
    background-color: "transparent";

    border-bottom: ${isHomePage ? "none" : `1px solid ${colors.border1}`};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    .nav-wrapper {
      max-width: 1100px;
      height: 100%;
      margin: 0 auto;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &__logo {
        color: ${colors.accent};
        font-weight: 700;
      }

      &__links {
        display: flex;
        align-items: center;

        ul {
          list-style-type: none;
          display: flex;
          li {
            color: ${colors.text2};
            font-size: 14px;
            margin-right: 20px;
            &.active {
              a {
                font-weight: 700;
                color: ${colors.text1};
              }
            }

            a {
              text-decoration: none;
              color: ${colors.text2};
            }
          }
        }

        button {
          border-radius: 100px;
          padding: 5px 20px;
          border: none;
          font-weight: 600;
          background-color: ${colors.text1};
          color: ${colors.text1 === lightThemeColors.text1
            ? "#ffffff"
            : "#000000"};
        }
      }
    }
  `}
`;

export default Nav;
