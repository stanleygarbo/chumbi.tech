export interface IStakingRewards {
  stakingData?: {
    staked?: number;
    rewards?: number;
    periodFinish?: number;
    stakingTill?: number;
    stakingCap?: number;
    APR?: number;
    totalSupply?: number;
  };
}
