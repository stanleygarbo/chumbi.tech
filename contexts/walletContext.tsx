import React, { useState, createContext, useContext, useEffect } from "react";
import { IWalletContext } from "../interfaces/contexts/IWalletContext";
import ContractABI from "../contracts/ChumbiABI.json";
import Web3 from "web3";

const walletContext = createContext<IWalletContext>({
  current: "",
  connectWallet: () => {},
  isConnected: false,
});

const useWalletContext = () => {
  const [current, setCurrent] = useState();

  const contractAddress = "0x5492ef6aeeba1a3896357359ef039a8b11621b45";
  const abi = ContractABI;

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    const web3 = new Web3(ethereum);

    if (!ethereum) {
      alert("please install metamask"!);
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const contract = new web3.eth.Contract(abi.ContractABI, contractAddress);

      console.log(contract);

      const balance = await contract.events.Transfer(
        "0x337dd00896364385f6bf21af92436e8030f32b63",
        "0x3ecb91fa5b68f200965e98358f0b56cdb75a237a",
        3739
      );

      console.log(balance);
      balance.callback((res: any) => console.log(res));

      setCurrent(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    current,
    connectWallet: connectWalletHandler,
  };
};

export const WalletContextProvider: React.FC<{ children: React.ReactChild }> =
  ({ children }) => {
    const wallet = useWalletContext();
    return (
      <walletContext.Provider value={wallet}>{children}</walletContext.Provider>
    );
  };

export const useWallet = () => useContext(walletContext);
