import React, { useState, useEffect, createContext, useContext } from "react";
import { IScreenSizeContext } from "../interfaces/contexts/IScreenSizeContext";

const screenSizeContext = createContext<IScreenSizeContext>({
  screenWidth: 0,
});

const useScreenSizeContext = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    setScreenWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = () => {
    setScreenWidth(window.innerWidth);
  };

  return {
    screenWidth,
  };
};

export const ScreenSizeContextProvider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  const screenSize = useScreenSizeContext();
  return (
    <screenSizeContext.Provider value={screenSize}>
      {children}
    </screenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(screenSizeContext);
