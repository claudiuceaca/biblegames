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
    image: require("@/assets/images/oaie/Oaie2.png"),

    sheep: {
      x: 386,
      y: 517,
      width: 45,
      height: 45,
    },
  },

  {
    id: 3,
    image: require("@/assets/images/oaie/Oaie3.png"),

    sheep: {
      x: 389,
      y: 366,
      width: 45,
      height: 45,
    },
  },

  
  {
    id: 4,
    image: require("@/assets/images/oaie/Oaie4.png"),

    sheep: {
      x: 386,
      y: 517,
      width: 45,
      height: 45,
    },
  },

  {
    id: 5,
    image: require("@/assets/images/oaie/Oaie5.png"),

    sheep: {
      x: 386,
      y: 517,
      width: 45,
      height: 45,
    },
  },
];