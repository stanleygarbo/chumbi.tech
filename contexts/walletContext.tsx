import React, { useState, createContext, useContext, useEffect } from "react";
import { IWalletContext } from "../interfaces/contexts/IWalletContext";
import ChumbiContractABI from "../contracts/ChumbiABI.json";
import CHMBStakingContractABI from "../contracts/StakingABI.json";
import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { AbiItem } from "web3-utils";

const walletContext = createContext<IWalletContext>({
  current: "",
  setCurrent: () => {},
  connectWallet: () => {},
  isConnected: false,
  tokenURI: (tokenID: number) => {},
  totalChumbi: (address: string) => {},
});

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const ChumbiContractAddress = "0x5492ef6aeeba1a3896357359ef039a8b11621b45";
const ChumbiABI = ChumbiContractABI;
const CHMBStaking_90days_ContractAddress =
  "0xaf55804d5ddb764fb444e00d99fec9e52883ee17";
const CHMBStaking_180days_ContractAddress =
  "0x20112dFceE4C22057aB6751AE1ac2DE0109C468c";
const CHMBStaking_365days_ContractAddress =
  "0x1568F0E8ff865bE61D2D735AD1Ba07f199A4590a";

const CHMBStakingABI = CHMBStakingContractABI;

const BSCProvider = new Web3.providers.HttpProvider(
  "https://bsc-dataseed.binance.org/"
);
const BSCWeb3 = new Web3(BSCProvider);

const polygonProvider = new Web3.providers.HttpProvider(
  "https://polygon-rpc.com/"
);
const polygonWeb3 = new Web3(polygonProvider);

const useWalletContext = () => {
  const [current, setCurrent] = useState<string>();

  const ChumbiContract = new polygonWeb3.eth.Contract(
    ChumbiABI.ContractABI as AbiItem[],
    ChumbiContractAddress
  );

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("please install metamask"!);
    }

    try {
      if (!current) {
        const accounts = await ethereum.request<string[]>({
          method: "eth_requestAccounts",
        });

        if (accounts) setCurrent(accounts[0]);

        localStorage.setItem("WalletConnected", "true");
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
    }
  };

  const stakingData = async ({
    address,
    duration,
  }: {
    address: string;
    duration: 90 | 180 | 365;
  }) => {
    const baseUnitizeAndToFixedIfNecessary = (rewards: number) =>
      +parseFloat(Web3.utils.fromWei(rewards.toString())).toFixed(2);

    const baseUnitize = (rewards: number) =>
      Number(Web3.utils.fromWei(rewards.toString())).toFixed(0);

    if (BSCWeb3)
      try {
        const CHMBStakingContract = new BSCWeb3.eth.Contract(
          CHMBStakingABI.a as AbiItem[],
          duration === 90
            ? CHMBStaking_90days_ContractAddress
            : duration === 180
            ? CHMBStaking_180days_ContractAddress
            : CHMBStaking_365days_ContractAddress
        );

        const rewards = await CHMBStakingContract.methods
          .earned(address)
          .call();
        const staked = await CHMBStakingContract.methods
          .balanceOf(address)
          .call();
        const periodFinish = await CHMBStakingContract.methods
          .periodFinish()
          .call();
        const stakingTill = await CHMBStakingContract.methods
          .stakingTill()
          .call();
        const stakingCap = await CHMBStakingContract.methods
          .stakingCap()
          .call();

        return {
          staked: baseUnitizeAndToFixedIfNecessary(staked),
          rewards: baseUnitizeAndToFixedIfNecessary(rewards),
          periodFinish,
          stakingTill,
          stakingCap: baseUnitize(stakingCap),
        };
      } catch (err) {
        return {};
      }
  };

  const tokenURI = async (tokenID: number) => {
    if (polygonWeb3) {
      try {
        // const contract = new web3.eth.Contract(abi.ContractABI, contractAddress);
        const tokenUri = await ChumbiContract.methods.tokenURI(tokenID).call();
        return tokenUri;
      } catch (err) {
        return 0;
      }
    }
  };

  const totalChumbi = async (address: string) => {
    if (polygonWeb3) {
      // const contract = ;
      const balance = await ChumbiContract.methods.balanceOf(address).call();
      return balance;
    }
    return 0;
  };

  const totalCHMB = async () => {};

  const totalLSTS = async () => {};

  useEffect(() => {
    const { ethereum } = window;

    async function asynInit() {
      // connect automatically if the user has already connected wallet before
      const hasConnectedWalletBefore = localStorage.getItem("WalletConnected");
      if (hasConnectedWalletBefore) {
        const accounts = await ethereum.request<string[]>({
          method: "eth_requestAccounts",
        });

        if (accounts) setCurrent(accounts[0]);
      }
    }

    asynInit();
  }, []);

  return {
    current,
    setCurrent,
    connectWallet: connectWalletHandler,
    tokenURI,
    totalChumbi,
    stakingData,
  };
};

export const WalletContextProvider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  const wallet = useWalletContext();
  return (
    <walletContext.Provider value={wallet}>{children}</walletContext.Provider>
  );
};

export const useWallet = () => useContext(walletContext);
