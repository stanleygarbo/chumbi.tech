const tier1Types = [
  "neutral",
  "forest",
  "cave",
  "flame",
  "river",
  "mountain",
  "spark",
  "insect",
];

const tier2Types = ["feather", "crystal", "frost", "flower"];

const tier3Types = ["spirit", "creature"];

const tier4Types = ["void"];

export function getTierByType(type: string): number {
  return tier1Types.includes(type)
    ? 1
    : tier2Types.includes(type)
    ? 2
    : tier3Types.includes(type)
    ? 3
    : tier4Types.includes(type)
    ? 4
    : 0;
}
