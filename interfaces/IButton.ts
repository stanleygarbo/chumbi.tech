import React from "react";

export interface IButton {
  children?: React.ReactChild;
  onClick?: () => {};
  style?: React.CSSProperties;
}
