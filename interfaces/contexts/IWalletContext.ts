export interface IWalletContext {
  current: string | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<string | undefined>>;
  isConnected?: boolean;
  connectWallet?: () => void;
  tokenURI: (tokenID: number) => Promise<any> | void;
  totalChumbi: (address: string) => Promise<number> | void;
  totalCHMB: (address: string) => Promise<number> | void;
  stakingData?: ({ duration }: { duration: 90 | 180 | 365 }) => Promise<
    | {
        staked: number;
        rewards: number;
        periodFinish: number;
        stakingTill: number;
        stakingCap: number;
        APR: number;
        totalSupply: number;
      }
    | {
        staked?: undefined;
        rewards?: undefined;
        periodFinish?: undefined;
        stakingTill?: undefined;
        stakingCap?: undefined;
        APR?: undefined;
        totalSupply?: undefined;
      }
    | undefined
  >;
}
