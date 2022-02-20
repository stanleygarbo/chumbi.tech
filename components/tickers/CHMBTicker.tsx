import { useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchCHMBPrice from "../../api/FetchCHMBPrice";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { ICHMBTicker } from "../../interfaces/tickers/ICHMBTicker";

const fiat_currencies = [
  "usd",
  "thb",
  "inr",
  "php",
  "vnd",
  "eur",
  "sgd",
  "cad",
  "jpy",
  "idr",
  "cny",
  "myr",
].sort();

const CHMBTicker: React.FC<ICHMBTicker> = ({ style }) => {
  const [selectedFiatCurrency, setSelectedFiatCurrency] =
    useState<string>("usd");

  const { data } = useQuery(
    ["CHMBPrice", selectedFiatCurrency],
    () => FetchCHMBPrice(selectedFiatCurrency),
    {
      staleTime: Infinity,
    }
  );
  const { colors } = useTheme();

  return (
    <Container
      style={style}
      colors={colors}
      didGoUp={
        data && data["chumbai-valley"][`${selectedFiatCurrency}_24h_change`] > 0
      }
    >
      <div className="ticker">
        <img src="/chmb-token.png" alt="chmb" width={18} height={18} />

        <select
          value={selectedFiatCurrency}
          onChange={(e) => {
            setSelectedFiatCurrency(e.target.value);
          }}
        >
          {fiat_currencies.map((i, idx) => (
            <option key={idx} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="ticker__wrapper">
          <div className="ticker__wrapper__price">
            {data ? data["chumbai-valley"][selectedFiatCurrency] : "---"}
          </div>
          <div className="ticker__wrapper__change">
            {data &&
              data["chumbai-valley"][`${selectedFiatCurrency}_24h_change`] >
                0 &&
              "+"}
            {data
              ? Math.round(
                  (data["chumbai-valley"][
                    `${selectedFiatCurrency}_24h_change`
                  ] +
                    Number.EPSILON) *
                    100
                ) / 100
              : "---"}
            %
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors; didGoUp: boolean }>`
  ${({ colors, didGoUp }) => css`
    .ticker {
      /* max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: end; */
      display: flex;
      align-items: center;

      select {
        color: ${colors.text1};
        background: ${colors.bg4};

        border: 1px solid ${colors.border1};
        padding: 0px 3px;
        margin: 0 5px;
        border-radius: 3px;

        font-size: 13px;

        cursor: pointer;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        &:hover {
          background: ${colors.accent};
        }

        option {
          background: ${colors.bg3};
        }
      }

      &__wrapper {
        display: flex;
        align-items: center;
        position: relative;

        /* background: ${colors.bg1}; */
        /* border: 1px solid ${colors.border1}; */

        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        img {
          margin-right: 5px;
        }

        &__price {
          color: ${colors.text2};
          font-size: 14px;
          font-weight: 600;
        }

        &__change {
          color: ${didGoUp ? colors.success : colors.danger};
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  `}
`;

export default CHMBTicker;
