import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import CHMBTicker from "../tickers/CHMBTicker";

const TrackerNav: React.FC = () => {
  const { colors } = useTheme();
  const { pathname } = useRouter();

  return (
    <Container colors={colors}>
      <div className="tracker-nav">
        <ul className="tracker-nav__links">
          <li className={pathname === "/tracker/chumbi" ? "active" : ""}>
            <Link href="/tracker/chumbi">Chumbi</Link>
          </li>

          <li
            className={pathname === "/tracker/staking-rewards" ? "active" : ""}
          >
            <Link href="/tracker/staking-rewards">Staking</Link>
          </li>
          {/* <li className={pathname === "/tracker/chumbi-finder" ? "active" : ""}>
            <Link href="/tracker/chumbi-finder">Chumbi Finder</Link>
          </li> */}
          {/* <li className={pathname === "/tracker/fostership" ? "active" : ""}>
            <Link href="/tracker/fostership">Fostership</Link>
          </li> */}
        </ul>
        <div className="tracker-nav__tickers">
          <CHMBTicker />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    border-bottom: 1px solid ${colors.border1};

    .tracker-nav {
      max-width: 1140px;
      padding: 0px 20px 0px 20px;
      margin: 0 auto;

      color: ${colors.text2};

      display: flex;
      justify-content: space-between;

      &__links {
        list-style-type: none;
        display: flex;

        li {
          margin-right: 20px;
          padding-bottom: 10px;

          a {
            color: ${colors.text2};
            text-decoration: none;
            font-size: 14px;
            padding-bottom: 14px;
          }

          &.active {
            a {
              color: ${colors.text1};
            }
            border-bottom: 2px solid ${colors.text1};
          }
        }
      }
    }
  `}
`;

export default TrackerNav;
