export type Level = {
  id: number;

  image: any;

  sheep: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const levels: Level[] = [
  {
    id: 1,
    image: require("@/assets/images/oaie/Oaie1.png"),

    sheep: {
      x: 245,
      y: 520,
      width: 45,
      height: 45,
    },
  },

  {
    id: 2,
    image: require("@/assets/images/oaie/Oaie1.png"),

    sheep: {
      x: 120,
      y: 430,
      width: 45,
      height: 45,
    },
  },

  {
    id: 3,
    image: require("@/assets/images/oaie/Oaie1.png"),

    sheep: {
      x: 285,
      y: 610,
      width: 45,
      height: 45,
    },
  },
];