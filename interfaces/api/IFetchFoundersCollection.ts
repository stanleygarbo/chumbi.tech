export interface IFoundersCollectionNFT {
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  description: string;
  image: string;
  name: string;
  owner_of: string;
  syncing: number;
  token_id: string;
  symbol: string;
}

// export type IFetchFoundersCollection {
//   result: IFoundersCollectionNFT[];
// }
