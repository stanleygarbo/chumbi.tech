import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../../contexts/themeContext";
import { IColors } from "../../../interfaces/IColors";
import { IPools } from "../../../interfaces/tracker/staking-rewards/IPools";
import { BsQuestionLg } from "react-icons/bs";
import { addCommaToNumber } from "../../../util/addCommaToNumber";

const Pools: React.FC<IPools> = ({ pools }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <h1>Pools</h1>
      <div className="pools">
        {pools?.map((i, idx) => (
          <div key={idx} className="pools__card">
            <div className="pools__card__info">
              <BsQuestionLg size={12} />
              <div className="pools__card__info__text">
                Formula:
                <br />
                &emsp; {i.formula}
                <br />
                Where:
                <br />
                &emsp; SC = Staking Cap
                <br />
                &emsp; TS = Total Supply
              </div>
            </div>
            <div className="pools__card__name">{i.name}</div>
            <div className="pools__card__apr">
              {i?.APR ? addCommaToNumber(i.APR) : "---"}% APR
            </div>
            <div className="pools__card__rewards-by-time">
              <div className="pools__card__rewards-by-time__cont">
                <div className="pools__card__rewards-by-time__cont__title">
                  Monthly
                </div>
                <div className="pools__card__rewards-by-time__cont__value">
                  {i.APR ? (i.APR / 12).toFixed(2) : "---"}%
                </div>
              </div>
              <div className="pools__card__rewards-by-time__cont">
                <div className="pools__card__rewards-by-time__cont__title">
                  Weekly
                </div>
                <div className="pools__card__rewards-by-time__cont__value">
                  {i.APR ? (i.APR / 52.177457).toFixed(2) : "---"}%
                </div>
              </div>
              <div className="pools__card__rewards-by-time__cont">
                <div className="pools__card__rewards-by-time__cont__title">
                  Daily
                </div>
                <div className="pools__card__rewards-by-time__cont__value">
                  {i.APR ? (i.APR / 365).toFixed(2) : "---"}%
                </div>
              </div>
              <div className="pools__card__rewards-by-time__cont">
                <div className="pools__card__rewards-by-time__cont__title">
                  Hourly
                </div>
                <div className="pools__card__rewards-by-time__cont__value">
                  {i.APR ? (i.APR / 8765.81277).toFixed(2) : "---"}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    margin: 20px 0 50px 0px;

    h1 {
      color: ${colors.text1};
      font-size: 25px;
      margin: 30px 0;
    }

    .pools {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 100px;

      &__card {
        position: relative;
        /* width: fit-content; */

        &__info {
          position: absolute;
          top: 0;
          right: 0;
          color: ${colors.text2};
          background-color: ${colors.bg3};
          width: 25px;
          height: 25px;
          display: grid;
          place-items: center;
          border-radius: 100px;
          border: 1px solid ${colors.border1};
          transition: 0.3s;

          &__text {
            position: absolute;
            bottom: 30px;
            display: none;
            z-index: 10;
          }

          &:hover {
            background-color: ${colors.accent};
            color: #fff;

            .pools__card__info__text {
              display: flex;
              background: ${colors.bg2};
              padding: 20px;
              border-radius: 10px;
              color: ${colors.text2};
              font-size: 14px;

              width: 250px;
            }
          }
        }

        &__name {
          color: ${colors.text2};
          font-size: 13px;
        }

        &__apr {
          color: ${colors.text1};
          font-size: 18px;
          margin: 10px 0;
        }

        &__rewards-by-time {
          display: flex;
          justify-content: space-between;

          &__cont {
            &__title {
              color: ${colors.text2 + "80"};
              font-size: 12px;
            }

            &__value {
              color: ${colors.text2};
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }
  `}
`;

export default Pools;
