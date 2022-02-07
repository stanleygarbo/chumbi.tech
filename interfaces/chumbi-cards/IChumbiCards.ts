export interface IChumbiCards {
  data: {
    edition: number;
    name?: string;
    image: string;
    imagehash: string;
    type?: string;
    rarityrank?: number;
    ranking?: number;
    id: number;
    attributes: {
      traittype: string;
      value: string | number;
    }[];
  }[];
  linkTo?: string;
  linkAs?: string;
}
