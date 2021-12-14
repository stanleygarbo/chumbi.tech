const inCommon = {
  accent: "#7479f5",
  accent2: "#eac964",
  danger: "#f34541",
  success: "#38ba7d",
  warning: "#f7b217",
};

export const darkThemeColors = {
  bg1: "#23232e",
  bg2: "#151519",
  bg3: "#1d1d29",
  text1: "#eeeff1",
  text2: "#bab4cb",
  text3: "#2e2e3a",
  border1: "#3f3e4c",
  ...inCommon,
};

export const lightThemeColors = {
  bg1: "#ffffff",
  bg2: "#eeeeee",
  bg3: "#eaeaea",
  text1: "#222222",
  text2: "#333333",
  text3: "#e5e5e5",
  border1: "#d4d4d4",
  ...inCommon,
};

export const colors = {
  lightMode: lightThemeColors,
  darkMode: darkThemeColors,
};
