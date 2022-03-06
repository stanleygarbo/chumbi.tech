import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export type IParent = {
  coatType: string;
  tier: number;
  isShiny: boolean;
  isMini: boolean;
};

export type IBreed = {
  parent1: IParent;
  parent2: IParent;
};

export type IOffspring = {
  mainType: string;
  coatType: string;
  isShiny: boolean;
  isMini: boolean;
  name: string;
  id: number;
};

export type IOdds = {
  shiny: number;
  mini: number;
  coatType: {
    parent1: number;
    parent2: number;
    random: number;
  };
};

const types = [
  "neutral",
  "forest",
  "cave",
  "flame",
  "river",
  "mountain",
  "spark",
  "insect",
  "feather",
  "crystal",
  "frost",
  "flower",
  "spirit",
  "creature",
  "void",
];

export function getOdds({ parent1, parent2 }: IBreed): IOdds {
  const odds = {
    shiny: 0,
    mini: 0,
    coatType: {
      parent1: 40,
      parent2: 40,
      random: 20,
    },
  };

  odds.mini += parent1.isMini ? 10 : 0;
  odds.mini += parent2.isMini ? 10 : 0;

  odds.mini +=
    parent1.tier === 1
      ? 2
      : parent1.tier === 2
      ? 2
      : parent1.tier === 3
      ? 10
      : 15;

  odds.mini +=
    parent2.tier === 1
      ? 2
      : parent2.tier === 2
      ? 2
      : parent2.tier === 3
      ? 10
      : 15;

  odds.shiny += parent1.isShiny ? 5 : 0;
  odds.shiny += parent2.isShiny ? 5 : 0;

  odds.shiny +=
    parent1.tier === 1
      ? 1
      : parent1.tier === 2
      ? 1
      : parent1.tier === 3
      ? 5
      : 10;

  odds.shiny +=
    parent2.tier === 1
      ? 1
      : parent2.tier === 2
      ? 1
      : parent2.tier === 3
      ? 5
      : 10;

  return odds;
}

export function breed({ parent1, parent2 }: IBreed): IOffspring {
  const offspring = {
    mainType: "",
    coatType: "",
    isShiny: false,
    isMini: false,
    name: "",
    id: 0,
  };

  const odds = getOdds({ parent1, parent2 });

  const coatPercentage = Math.random() * 100;

  if (coatPercentage < 40) {
    offspring.coatType = parent1.coatType;
  } else if (coatPercentage < 80) {
    offspring.coatType = parent2.coatType;
  } else {
    offspring.coatType = types[Math.floor(Math.random() * types.length)];
  }

  offspring.mainType = types[Math.floor(Math.random() * types.length)];

  offspring.isMini = Math.random() * 100 < odds.mini;
  offspring.isShiny = Math.random() * 100 < odds.shiny;

  offspring.name = `${
    offspring.mainType === offspring.coatType
      ? "Pure"
      : capitalizeFirstLetter(offspring.mainType)
  } ${capitalizeFirstLetter(offspring.coatType)} ${
    offspring.isMini ? "Mini" : "Chumbi"
  }`;

  return offspring;
}
