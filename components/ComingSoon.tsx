import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";

const ComingSoon: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="msg">Coming Soon</div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .msg {
      font-size: 40px;
      font-weight: 800;
      color: ${colors.text2};
      padding: 200px 0;
      /* text-shadow: 0 0 1px ${colors.text2}; */
    }
  `}
`;

export default ComingSoon;
