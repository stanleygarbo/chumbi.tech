import styled, { css } from "styled-components";
import useSWR from "swr";
import FetchCHMBPrice from "../../api/FetchCHMBPrice";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { ICHMBTicker } from "../../interfaces/tickers/ICHMBTicker";

const CHMBTicker: React.FC<ICHMBTicker> = ({ style }) => {
  const { data } = useSWR("CHMBPrice", FetchCHMBPrice);
  const { colors } = useTheme();

  return (
    <Container
      style={style}
      colors={colors}
      didGoUp={data && data["chumbai-valley"][`php_24h_change`] > 0}
    >
      <div className="ticker">
        <div className="ticker__wrapper">
          <img src="/chmb-token.png" alt="chmb" width={18} />
          <div className="ticker__wrapper__price">
            ₱{data ? data["chumbai-valley"][`php`] : "---"}
          </div>
          <div className="ticker__wrapper__change">
            {data && data["chumbai-valley"][`php_24h_change`] > 0 && "+"}
            {data
              ? Math.round(
                  (data["chumbai-valley"][`php_24h_change`] + Number.EPSILON) *
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
