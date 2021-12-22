export interface IWalletContext {
  current: any;
  isConnected?: boolean;
  connectWallet?: () => void;
}
