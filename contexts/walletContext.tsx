import React, { useState, createContext, useContext, useEffect } from "react";
import { IWalletContext } from "../interfaces/contexts/IWalletContext";
import ChumbiContractABI from "../contracts/ChumbiABI.json";
import CHMBStakingContractABI from "../contracts/StakingABI.json";
import CHMBABI from "../contracts/CHMBABI.json";
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
  totalCHMB: (address: string) => {},
});

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const ChumbiContractAddress = "0x5492ef6aeeba1a3896357359ef039a8b11621b45";
const CHMBContractAddress = "0x5492ef6aeeba1a3896357359ef039a8b11621b45";
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

  const baseUnitizeAndToFixedIfNecessary = (rewards: number) =>
    Number(+parseFloat(Web3.utils.fromWei(rewards.toString())).toFixed(2));

  const baseUnitize = (rewards: number) =>
    Number(Number(Web3.utils.fromWei(rewards.toString())).toFixed(0));

  const ChumbiContract = new polygonWeb3.eth.Contract(
    ChumbiABI.ContractABI as AbiItem[],
    ChumbiContractAddress
  );

  const CHMBContract = new BSCWeb3.eth.Contract(
    CHMBABI as AbiItem[],
    CHMBContractAddress
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

  const stakingData = async ({ duration }: { duration: 90 | 180 | 365 }) => {
    if (!current) return {};

    const minPercentage =
      duration === 90 ? 100 : duration === 180 ? 150 : 196.72129;

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

        const rewards: number = await CHMBStakingContract.methods
          .earned(current)
          .call();

        const staked: number = await CHMBStakingContract.methods
          .balanceOf(current)
          .call();
        const periodFinish: number = await CHMBStakingContract.methods
          .periodFinish()
          .call();
        const stakingTill: number = await CHMBStakingContract.methods
          .stakingTill()
          .call();
        const stakingCap: number = await CHMBStakingContract.methods
          .stakingCap()
          .call();

        const totalSupply: number = await CHMBStakingContract.methods
          .totalSupply()
          .call();

        return {
          staked: baseUnitizeAndToFixedIfNecessary(staked),
          rewards: baseUnitizeAndToFixedIfNecessary(rewards),
          periodFinish,
          stakingTill,
          stakingCap: baseUnitize(stakingCap),
          totalSupply: baseUnitizeAndToFixedIfNecessary(totalSupply),
          APR: Number(
            (
              (baseUnitize(stakingCap) / baseUnitize(totalSupply)) *
              minPercentage
            ).toFixed(2)
          ),
        };
      } catch (err) {
        console.error(err instanceof Error && err.message);
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

  const totalCHMB = async (address: string) => {
    try {
      const balance: number = await CHMBContract.methods
        .balanceOf(address)
        .call();
      return Number(baseUnitizeAndToFixedIfNecessary(balance));
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      return -1;
    }
  };

  const totalLSTS = async () => {};

  useEffect(() => {
    const { ethereum } = window;

    async function asynInit() {
      // check if wallet address os saved
      const savedWalletAddress = localStorage.getItem("SavedWallet");

      if (savedWalletAddress) {
        console.log(savedWalletAddress);
        setCurrent(savedWalletAddress);
        return;
      }

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
    totalCHMB,
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
