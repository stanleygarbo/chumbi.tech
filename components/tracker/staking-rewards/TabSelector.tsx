import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../../contexts/themeContext";
import { IColors } from "../../../interfaces/IColors";
import { ITabSelector } from "../../../interfaces/tracker/staking-rewards/ITabSelector";

const TabSelector: React.FC<ITabSelector> = ({
  setSelectedDuration,
  selectedDuration,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <button
        onClick={() => setSelectedDuration(90)}
        className={`${selectedDuration === 90 ? "active" : ""}`}
      >
        90 Days
      </button>
      <button
        onClick={() => setSelectedDuration(180)}
        className={`${selectedDuration === 180 ? "active" : ""}`}
      >
        180 Days
      </button>
      <button
        onClick={() => setSelectedDuration(365)}
        className={`${selectedDuration === 365 ? "active" : ""}`}
      >
        365 Days
      </button>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    /* background: ${colors.bg3}; */
    border-radius: 5px;

    button {
      width: 100px;
      height: 40px;
      background: transparent;
      color: ${colors.text2};
      border: none;
      border-radius: 5px;
      font-weight: 700;
      margin: 10px;
      transition: 0.3s;

      &:hover {
        background: ${colors.bg4};
        color: ${colors.text1};
      }

      &.active {
        background: ${colors.accent2};
        color: ${colors.text1};
      }
    }
  `}
`;

export default TabSelector;
