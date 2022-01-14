export interface IWalletContext {
  current: string | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<string | undefined>>;
  isConnected?: boolean;
  connectWallet?: () => void;
  tokenURI: (tokenID: number) => Promise<any> | void;
  totalChumbi: (address: string) => Promise<number> | void;
}
