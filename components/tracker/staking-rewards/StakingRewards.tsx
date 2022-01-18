import moment from "moment";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../../contexts/themeContext";
import { IColors } from "../../../interfaces/IColors";
import { IStakingRewards } from "../../../interfaces/tracker/staking-rewards/IStakingRewards";
import { addCommaToNumber } from "../../../util/addCommaToNumber";

const StakingRewards: React.FC<IStakingRewards> = ({
  stakingData,
  totalTokens,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <section>
        <div className="stats">
          <img src="/chmb-token.png" alt="" />
          <h1>My Staked CHMB</h1>
          <div className="stats__data">
            <div className="stats__data__box">
              <div className="stats__data__box__title small-title">
                Total Staked
              </div>
              <div className="stats__data__box__val big-value">
                {stakingData?.staked !== undefined
                  ? addCommaToNumber(stakingData.staked)
                  : "---"}
              </div>
            </div>
            <div className="stats__data__box">
              <div className="stats__data__box__title small-title">Rewards</div>
              <div className="stats__data__box__val big-value">
                {stakingData?.rewards !== undefined
                  ? addCommaToNumber(stakingData.rewards)
                  : "---"}
              </div>
            </div>
            <div className="stats__data__box">
              <div className="stats__data__box__title small-title">
                Available in wallet
              </div>
              <div className="stats__data__box__val big-value">
                {totalTokens?.CHMB > -1 ? totalTokens.CHMB : "---"}
              </div>
            </div>
          </div>
        </div>
        <div className="additional">
          <div className="additional__info">
            <div className="additional__info__title small-title">
              Staking Cap
            </div>
            <div className="additional__info__val big-value">
              {stakingData?.stakingCap
                ? addCommaToNumber(stakingData.stakingCap)
                : "---"}
            </div>
          </div>

          <div className="additional__info">
            <div className="additional__info__title small-title">
              Reward Date
            </div>
            <div className="additional__info__val big-value">
              {stakingData?.periodFinish !== undefined
                ? moment.unix(stakingData.periodFinish).format("MMM D, YYYY")
                : "---"}
            </div>
          </div>
        </div>

        <div className="total">
          <div className="total__staked">
            <h2>Total Staked</h2>
            <p>
              <Image src={"/chmb-token.png"} width={30} height={30} alt="" />
              &nbsp;
              {stakingData?.totalSupply
                ? addCommaToNumber(stakingData.totalSupply)
                : "---"}{" "}
            </p>
            <div className="total__staked__line"></div>
            <div className="total__staked__apr">
              APR:&nbsp;
              {stakingData?.APR ? addCommaToNumber(stakingData.APR) : "---"}%
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .title {
      color: ${colors.text1};
      font-size: 20px;
      margin-top: 20px;
    }

    .small-title {
      text-transform: uppercase;
      color: ${colors.text2};
      font-size: 12px;
      font-weight: 500;
    }

    .big-value {
      color: ${colors.text1};
      font-size: 20px;
      font-weight: 600;
      margin-top: 5px;
    }

    section {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 250px 300px;
      gap: 20px;
    }

    .total {
      /* background: ${colors.bg4}; */
      /* border: 1px solid ${colors.bg2}; */
      border-radius: 5px;

      &__staked {
        width: 300px;
        height: 200px;
        border: 1px solid ${colors.bg2};
        border-radius: 10px;

        padding: 14px 20px;

        background: ${colors.bg4};

        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h2 {
          color: ${colors.text2};
          font-size: 18px;
          margin: 0;
        }

        p {
          color: ${colors.text1};
          font-weight: 700;
          font-size: 22px;
          display: flex;
          align-items: center;
        }

        &__line {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background: url("/staked-line.png");
          background-position: center;
          background-size: 70%;
          background-repeat: no-repeat;
        }

        &__apr {
          color: ${colors.text2};
          font-weight: 600;
        }
      }
    }

    .additional {
      display: grid;

      gap: 20px;

      &__info {
        background: ${colors.bg4};
        border-radius: 10px;
        border: 1px solid ${colors.bg2};
        padding: 14px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .stats {
      padding: 14px 20px;
      border: 1px solid ${colors.bg2};
      background: ${colors.bg4};

      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;

      img {
        /* filter: invert(100%) brightness(200%) saturate(12%); */
        opacity: 0.09;
        width: 250px;
        position: absolute;
        right: -20px;
        bottom: 20px;
      }

      h1 {
        color: ${colors.text1};
        font-size: 25px;
      }

      &__data {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 20px;
      }
    }
  `}
`;

export default StakingRewards;
