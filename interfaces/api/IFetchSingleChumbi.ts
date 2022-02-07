export interface IFetchSingleChumbi {
  attributes: {
    traittype: string;
    value: string | number;
  }[];
  chart: {
    score: number;
    traitCommonality: number;
    traitType: string;
    traitValue: string | number;
  }[];
  date: number;
  dna: string;
  edition: number;
  image: string;
  imagehash: string;
  name: string;
  rarityrank: number;
  raritytraitscore: number;
  id: number;
}
