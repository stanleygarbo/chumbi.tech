import React, { ReactChild } from "react";
import { ThemeContextProvider } from "./themeContext";

const AllContextProviders: React.FC<{ children: ReactChild }> = ({
  children,
}) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default AllContextProviders;
