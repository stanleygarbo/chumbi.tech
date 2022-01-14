import React, { useState, useEffect, createContext, useContext } from "react";
import { colors } from "../theme/colors";
import { IThemeContext } from "../interfaces/contexts/IThemeContext";

const themeContext = createContext<IThemeContext>({
  isDarkMode: true,
  toggleDarkMode: () => {},
  colors: colors.darkMode,
});

const useThemeContext = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == null) {
      setIsDarkMode(true);
    }
    if (theme === "light") setIsDarkMode(false);
    if (theme === "dark") setIsDarkMode(true);

    //always dark mode

    setIsDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    colors: isDarkMode ? colors.darkMode : colors.lightMode,
  };
};

export const ThemeContextProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const theme = useThemeContext();
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
