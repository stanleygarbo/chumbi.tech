import React, { useState, createContext, useContext, useEffect } from "react";
import { IWalletContext } from "../interfaces/contexts/IWalletContext";
import ContractABI from "../contracts/ChumbiABI.json";
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

const contractAddress = "0x5492ef6aeeba1a3896357359ef039a8b11621b45";
const abi = ContractABI;

const useWalletContext = () => {
  const [current, setCurrent] = useState<string>();
  const [web3, setWeb3] = useState<Web3>();
  const [chumbiContract, setChumbiContract] = useState<any>();

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("please install metamask"!);
    }

    if (web3)
      try {
        if (!current) {
          if ((await web3.eth.net.getId()) !== 137) {
            throw Error("Connect to polygon");
          }

          const accounts = await ethereum.request<string[]>({
            method: "eth_requestAccounts",
          });

          if (accounts) setCurrent(accounts[0]);

          localStorage.setItem("WalletConnected", "true");
        }
      } catch (err) {
        console.error(err);
      }
  };

  const tokenURI = async (tokenID: number) => {
    if (web3) {
      try {
        // const contract = new web3.eth.Contract(abi.ContractABI, contractAddress);
        const tokenUri = await chumbiContract.methods.tokenURI(tokenID).call();
        return tokenUri;
      } catch (err) {
        return 0;
      }
    }
  };

  const totalChumbi = async (address: string) => {
    if (web3) {
      // const contract = ;
      const balance = await chumbiContract.methods.balanceOf(address).call();
      return balance;
    }
    return 0;
  };

  const totalCHMB = async () => {};

  const totalLSTS = async () => {};

  useEffect(() => {
    const { ethereum } = window;

    async function asynInit() {
      // connect to polygon rpc

      const provider = new Web3.providers.HttpProvider(
        "https://polygon-rpc.com/"
      );
      const web3 = new Web3(provider);
      setWeb3(web3);
      setChumbiContract(
        new web3.eth.Contract(abi.ContractABI as AbiItem[], contractAddress)
      );

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
