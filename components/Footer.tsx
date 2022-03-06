import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { useWallet } from "../contexts/walletContext";
import { IColors } from "../interfaces/IColors";
import Socials from "./Socials";

const Footer = () => {
  const { colors } = useTheme();

  const { pathname } = useRouter();
  const { current } = useWallet();

  if (
    pathname.includes("/tracker") ||
    pathname.includes("/finder") ||
    pathname.includes("/chumbi-avatar-generator") ||
    pathname.includes("/seed-ranking")
  )
    return null;

  return (
    <Container colors={colors}>
      <div className="footer-container">
        <div className="footer-container__grid">
          <div className="footer-container__grid__row">
            <h3>Useful Links</h3>
            <ul>
              <li>
                <Link href={`/tracker${current ? "/chumbi" : ""}`}>
                  Tracker
                </Link>
              </li>
              <li>
                <Link href="/seed-ranking">Seed Ranking</Link>
              </li>
              <li>
                <Link href="/chumbi-avatar-generator">Avatar Generator</Link>
              </li>
              <li>
                <Link href="/guides">Guides</Link>
              </li>
              <li>
                <Link href="/breeding-simulator">Breeding</Link>
              </li>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
            </ul>
          </div>
          <div className="footer-container__grid__row">
            <h3>Articles</h3>
            <ul>
              <li>
                <Link href="/">No</Link>
              </li>
              <li>
                <Link href="/">Articles</Link>
              </li>
              <li>
                <Link href="/">Yet</Link>
              </li>
            </ul>
          </div>
          <div className="footer-container__grid__row">
            <h3>Follow me on</h3>
            <ul>
              <li>
                <a href="https://twitter.com/digital_mad_lad" target="blank">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" target="blank">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" target="blank">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-container__grid__row footer-container__grid__row--about">
            <h3>About</h3>
            <p>
              Chumbi Technologies is a fan-made website dedicated to Chumbi
              Valley, developed by Vangeance (Digital Mad Lad) — a poor
              teenager. Chumbi.Tech&apos;s goal is to provide chumbi villagers
              with guides and tools that are free and of high quality.
            </p>
          </div>
        </div>

        <div className="footer-container__bottom">
          <span>&copy;2022 Digital Mad Lad</span>

          <Socials
            // style={{ transform: "translate(-15px,-10px)" }}
            iconSize={18}
            isHorizontal
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.footer<{ colors: IColors }>`
  ${({ colors }) => css`
    background-color: ${colors.bg3};
    color: ${colors.text2};
    border-top: 2px solid ${colors.border1};
    width: 100%;
    min-height: 100vh;
    /* position: absolute;
    bottom: 0;
    left: 0; */
    background-image: url("/lines.svg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;

    .footer-container {
      max-width: 1140px;
      margin: 0 auto;

      /* display: grid;
      place-items: center; */
      padding: 20px 20px;

      font-size: 13px;

      &__grid {
        padding: 50px 0px;

        display: grid;
        grid-template-columns: 150px 150px 150px 1fr;
        gap: 50px;
        align-items: start;

        @media (max-width: 836px) {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

          &__row--about {
            grid-column: span 3;
          }
        }

        @media (max-width: 739px) {
          &__row--about {
            grid-column: span 1;
          }
        }

        &__row {
          ul {
            margin-top: 10px;
            li {
              padding-top: 15px;
            }
          }

          p {
            margin-top: 25px;
          }
        }
      }

      &__bottom {
        border-top: 1px solid ${colors.border1};
        padding-top: 60px;
        padding-bottom: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: ${colors.text2};
          font-size: 12px;
        }
      }
    }
  `}
`;

export default Footer;
