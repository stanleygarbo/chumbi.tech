import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const Footer = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="footer-container">
        <p>Chumbi Technologies is a fan-made website dedicated to the game</p>
      </div>
    </Container>
  );
};

const Container = styled.footer<{ colors: IColors }>`
  ${({ colors }) => css`
    background-color: ${colors.bg3};
    color: ${colors.text2};
    border-top: 2px solid ${colors.border1};

    .footer-container {
      max-width: 1100px;
      margin: 0 auto;

      display: grid;
      place-items: center;
      padding: 20px 0px;

      font-size: 13px;
    }
  `}
`;

export default Footer;
