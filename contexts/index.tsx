import React, { ReactChild } from "react";
import { ScreenSizeContextProvider } from "./screenSizeContext";
import { ThemeContextProvider } from "./themeContext";
import { WalletContextProvider } from "./walletContext";

const AllContextProviders: React.FC<{ children: ReactChild }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider>
      <ScreenSizeContextProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </ScreenSizeContextProvider>
    </ThemeContextProvider>
  );
};

export default AllContextProviders;
