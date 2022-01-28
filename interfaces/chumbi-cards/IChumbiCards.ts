export interface IChumbiCards {
  data: {
    edition: number;
    name?: string;
    image: string;
    imagehash: string;
    type?: string;
    rarityrank?: number;
    ranking?: number;
    attributes: {
      traittype: string;
      value: string | number;
    }[];
  }[];
  linkTo?: string;
}
