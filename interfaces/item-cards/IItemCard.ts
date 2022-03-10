export interface IItemCard {
  id: string;
  image: string;
  name: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}
