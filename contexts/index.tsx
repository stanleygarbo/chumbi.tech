import React, { ReactChild } from "react";
import { ThemeContextProvider } from "./themeContext";
import { WalletContextProvider } from "./walletContext";

const AllContextProviders: React.FC<{ children: ReactChild }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </ThemeContextProvider>
  );
};

export default AllContextProviders;
