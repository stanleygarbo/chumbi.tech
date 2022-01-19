import React from "react";

export interface IRawSocials {
  isHorizontal: boolean;
  colored?: boolean;
  iconSize?: number;
  style?: React.CSSProperties;
  showBorders?: boolean;
}

export interface ISocials extends IRawSocials {
  showTitle?: boolean;
  rawSocialsStyle?: React.CSSProperties;
  socialsStyle?: React.CSSProperties;
}
