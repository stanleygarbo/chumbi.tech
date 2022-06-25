interface IAttributes {
  id?: string;
  name?: string;
  mainType?: string;
  coatType?: string;
  coatVariation?: string;
  horns?: string;
  ears?: string;
  eyes?: string;
  mouth?: string;
  pattern?: string;
  size?: string;
  isShiny?: boolean;
  shade?: string;
  seed?: string;
  typeTier?: number;
  mainAttack?: string;
  secondAttack?: string;
  eyesEffect?: string;
  mouthEffect?: string;
  ability?: string;
  breedCount?: number;
  generation?: number;
}

interface data extends IAttributes {
  id?: string;
  sourceId?: string;
  name?: string;
  imageUrl?: string;
  description?: string;
  rarityScore?: number;
  rank?: number;
  rarityScoreDetails?: {
    mainType: string;
    coatType: string;
    coatVariation: string;
    horns: string;
    ears: string;
    eyes: string;
    mouth: string;
    pattern: string;
    size: string;
    isShiny: string;
    shade: string;
    seed: string;
    typeTier: string;
    mainAttack: string;
    secondAttack: string;
    eyesEffect: string;
    mouthEffect: string;
    ability: string;
    breedCount: string;
    generation: string;
  };
}

export interface IChumbiCards {
  data: data[];
  linkTo?: string;
  linkAs?: string;
}
