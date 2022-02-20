import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { ILimitSelector } from "../../interfaces/seed-ranking/ILimitSelector";

const LimitSelector: React.FC<ILimitSelector> = ({ onChange, value }) => {
  const { colors } = useTheme();
  const onSelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(Number(e.target.value));
  };

  return (
    <Select
      colors={colors}
      value={value ? value : 20}
      onChange={onSelectHandler}
    >
      <option value={20}>20 Items</option>
      <option value={50}>50 Items</option>
      <option value={100}>100 Items</option>
      <option value={200}>200 Items</option>
    </Select>
  );
};

const Select = styled.select<{ colors: IColors }>`
  ${({ colors }) => css`
    border-radius: 5px;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;

    background: ${colors.bg4};
    color: ${colors.text1};

    border: 1px solid ${colors.border1};
    cursor: pointer;

    transition: 0.3s border;

    &:hover {
      border: 1px solid ${colors.text1 + 50};
    }

    option {
      padding: 10px;
    }
  `}
`;

export default LimitSelector;
