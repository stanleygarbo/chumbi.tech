export interface IChumbiCards {
  data: {
    id: number;
    name?: string;
    rarity?: string;
    image: string;
    type?: string;
  }[];
  linkTo?: string;
}
