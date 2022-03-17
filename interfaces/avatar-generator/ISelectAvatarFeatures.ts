import { Dispatch, SetStateAction } from "react";

type IFeature = {
  saved: string;
  selecting: string;
  isOpen: boolean;
  id: string;
  recommended?: string[];
};

export interface IFeatures {
  coat: IFeature;
  hair: IFeature;
  skin: IFeature;
  eyes: IFeature;
  coatTrim: IFeature;
}

export interface ISelectAvatarFeatures {
  features: IFeatures;
  setFeatures: Dispatch<SetStateAction<IFeatures>>;
}
