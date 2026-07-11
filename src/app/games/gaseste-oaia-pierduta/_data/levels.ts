export interface OaiaLevelConfig {
  id: number;
  name: string;
  duration: number;
  sheepCount: number; // Numărul de oi care trebuie găsite în acest nivel
  difficulty: "easy" | "medium" | "hard";
  position: { x: string; y: string };
  iconUnlocked: any;
  iconLocked: any;
}

export const OAIA_LEVELS: OaiaLevelConfig[] = [
  {
    id: 1,
    name: "Câmpia Verde",
    duration: 30,
    sheepCount: 3,
    difficulty: "easy",
    position: { x: "25.0%", y: "85.0%" },
    iconUnlocked: require("../_assets/rodie.png"), // Schimbă cu iconițele tale
    iconLocked: require("../_assets/rodieLacat.png"),
  },
  {
    id: 2,
    name: "Dealul Ascuns",
    duration: 30,
    sheepCount: 5,
    difficulty: "easy",
    position: { x: "45.0%", y: "75.0%" },
    iconUnlocked: require("../_assets/rodie.png"), // Schimbă cu iconițele tale
    iconLocked: require("../_assets/rodieLacat.png"),
  },
  {
    id: 3,
    name: "Pădurea deasă",
    duration: 35,
    sheepCount: 7,
    difficulty: "medium",
    position: { x: "65.0%", y: "65.0%" },
    iconUnlocked: require("../_assets/rodie.png"), // Schimbă cu iconițele tale
    iconLocked: require("../_assets/rodieLacat.png"),
  },
  // Nivelele 4-12 generate automat (ajustează pozițiile ulterior din consolă)
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 4,
    name: `Nivelul ${i + 4}`,
    duration: 40 + i * 5,
    sheepCount: 8 + i * 2,
    difficulty: (i + 4 > 8 ? "hard" : "medium") as "medium" | "hard",
    position: { x: `${20 + ((i * 8) % 60)}%`, y: `${55 - i * 5}%` },
    iconUnlocked: require("../_assets/rodie.png"), // Schimbă cu iconițele tale
    iconLocked: require("../_assets/rodieLacat.png"),
  })),
];
