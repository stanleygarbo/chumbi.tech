import moment from "moment";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../../contexts/themeContext";
import { IColors } from "../../../interfaces/IColors";
import { IStakingRewards } from "../../../interfaces/tracker/staking-rewards/IStakingRewards";
import { addCommaToNumber } from "../../../util/addCommaToNumber";

const StakingRewards: React.FC<IStakingRewards> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      {!data && <Image width={30} height={30} src="dots-loader.svg" alt="" />}
      <div className="stats">
        <div className="stats__box">
          <div className="stats__box__title">Staked</div>
          <div className="stats__box__val">
            <Image src="/chmb-token.png" width={20} height={20} alt="" /> &nbsp;
            {data.staked !== undefined ? addCommaToNumber(data.staked) : "---"}
          </div>
        </div>
        <div className="stats__box">
          <div className="stats__box__title">Rewards</div>
          <div className="stats__box__val">
            <Image src="/chmb-token.png" width={20} height={20} alt="" /> &nbsp;
            {data.rewards !== undefined
              ? addCommaToNumber(data.rewards)
              : "---"}
          </div>
        </div>
        <div className="stats__box">
          <div className="stats__box__title">Staking Cap</div>
          <div className="stats__box__val">
            <Image src="/chmb-token.png" width={20} height={20} alt="" /> &nbsp;
            {data.stakingCap !== undefined
              ? addCommaToNumber(data.stakingCap)
              : "---"}
          </div>
        </div>
        <div className="stats__box">
          <div className="stats__box__title">Staking since</div>
          <div className="stats__box__val">
            📅&nbsp;
            {data.stakingTill !== undefined
              ? moment.unix(data.stakingTill / 1000).format("MMM D, YYYY")
              : "---"}
          </div>
        </div>
        <div className="stats__box">
          <div className="stats__box__title">Claimable on</div>
          <div className="stats__box__val">
            📅&nbsp;
            {data.stakingTill !== undefined
              ? moment.unix(data.periodFinish).format("MMM D, YYYY")
              : "---"}
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    padding: 20px;

    .stats {
      color: ${colors.text2};
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 580px;
      gap: 20px;

      &__box {
        border: 1px solid ${colors.bg2};
        border-radius: 5px;
        padding: 10px;

        &__title {
          font-weight: 700;
          color: ${colors.text1};
          margin-bottom: 10px;
        }
        &__val {
          display: flex;
          align-items: center;
        }
      }
    }
  `}
`;

export default StakingRewards;
