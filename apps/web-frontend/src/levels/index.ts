export interface Level {
  requiredMatches: number;
  totalPairs: number;
}

export const levels: Array<Level> = [
  {
    requiredMatches: 2,
    totalPairs: 6,
  },
];

export interface CardBase {
  src: string;
}

export const cards: Array<CardBase> = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];
