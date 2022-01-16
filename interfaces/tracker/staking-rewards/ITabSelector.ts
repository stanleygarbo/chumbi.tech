import { Dispatch, SetStateAction } from "react";

export interface ITabSelector {
  setSelectedDuration: Dispatch<SetStateAction<90 | 180 | 365>>;
  selectedDuration: 90 | 180 | 365;
}
