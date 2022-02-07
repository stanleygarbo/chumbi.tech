import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { IPagePicker } from "../../interfaces/seed-ranking/IPagePicker";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const PagePicker: React.FC<IPagePicker> = ({
  maxPage,
  currentPage,
  onPagePick,
}) => {
  const { colors } = useTheme();
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Container colors={colors}>
      <button
        className={`page-move prev ${currentPage < 2 && "disabled"}`}
        disabled={currentPage < 2}
        onClick={() => {
          onPagePick(Number(currentPage) - 1);
        }}
      >
        <HiArrowLeft />
      </button>
      Page&nbsp;
      <input
        type="number"
        max={maxPage}
        min={1}
        value={page}
        onChange={(e) => {
          setPage(Number(e.target.value));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && page <= maxPage) {
            onPagePick(page);
          }
        }}
        onBlur={() => {
          setPage(currentPage);
        }}
      />
      &nbsp;of {maxPage}
      <button
        onClick={() => {
          onPagePick(Number(currentPage) + 1);
        }}
        className={`page-move next ${currentPage >= maxPage && "disabled"}`}
        disabled={currentPage >= maxPage}
      >
        <HiArrowRight />
      </button>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    margin-top: 30px;
    color: ${colors.text2};
    display: flex;
    align-items: center;
    font-size: 14px;

    .page-move {
      border: 1px solid ${colors.border1};
      color: ${colors.text2};
      background: transparent;
      padding: 6px 15px;
      border-radius: 5px;
      font-size: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.3s;
      &:hover {
        border: 1px solid ${colors.text2 + 80};
        color: ${colors.text1};
      }
    }

    .disabled {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        border: 1px solid ${colors.border1};
        color: ${colors.text2};
      }
    }

    input {
      width: 50px;
      background: ${colors.bg2};
      border: 1px solid ${colors.border1};
      border-radius: 5px;
      padding: 7px 10px;

      font-size: 15px;
      color: ${colors.text2};
      outline: none;
      transition: 0.3s;

      &:hover {
        border: 1px solid ${colors.text2 + 80};
      }
      &:focus {
        border: 1px solid ${colors.accent};
      }
    }
    input[type="number"] {
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    .prev {
      margin-right: 30px;
    }
    .next {
      margin-left: 30px;
    }
  `}
`;

export default PagePicker;
