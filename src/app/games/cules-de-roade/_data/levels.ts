import { ComponentType } from "react";

export interface LevelConfig {
  id: number;
  name: string;
  background: any;
  duration: number;
  spawnRate: number;
  speed: number;
  thornChance: number;
  fruits?: {
    [key: string]: number;
  };
  position: {
    x: string;
    y: string;
  };
  iconUnlocked: ComponentType<any> | any;
  iconLocked: ComponentType<any> | any;
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "Nivelul 1",
    background: require("../assets/levele/level1.png"),
    duration: 30,
    spawnRate: 1200,
    speed: 230,
    thornChance: 0.05,
    fruits: { apple: 0.45, grape: 0.25, wheat: 0.20, pear: 0.10 },
    position: { x: "43.2%", y: "92.7%" },
    iconUnlocked: require("../assets/levele/rodie.png"), // Imaginea completă deblocată
    iconLocked: require("../assets/levele/rodieLacat.png"), // Imaginea completă blocată
  },
  {
    id: 2,
    name: "Nivelul 2",
    background: require("../assets/levele/level1.png"),
    duration: 30,
    spawnRate: 1100,
    speed: 250,
    thornChance: 0.08,
    position: { x: "37.0%", y: "84%" }, 
    iconUnlocked: require("../assets/levele/para.png"), // Schimbă cu mar.png când ai grafica
    iconLocked: require("../assets/levele/paraLacat.png"),
  },
  {
    id: 3,
    name: "Nivelul 3",
    background: require("../assets/levele/level1.png"),
    duration: 35,
    spawnRate: 950,
    speed: 290,
    thornChance: 0.12,
    position: { x: "74.4%", y: "76.7%" }, 
    iconUnlocked: require("../assets/levele/ananas.png"),
    iconLocked: require("../assets/levele/ananasLacat.png"),
  },
  {
    id: 4,
    name: "Nivelul 4",
    background: require("../assets/levele/level1.png"),
    duration: 35,
    spawnRate: 900,
    speed: 300,
    thornChance: 0.14,
    position: { x: "50.2%", y: "72%" }, // Ajustează poziția din consolă
    iconUnlocked: require("../assets/levele/strugure.png"),
    iconLocked: require("../assets/levele/strugureLacat.png"),
  },
  {
    id: 5,
    name: "Nivelul 5",
    background: require("../assets/levele/level1.png"),
    duration: 40,
    spawnRate: 850,
    speed: 310,
    thornChance: 0.15,
    position: { x: "30%", y: "65%" },
    iconUnlocked: require("../assets/levele/grau.png"),
    iconLocked: require("../assets/levele/grauLacat.png"),
  },
  {
    id: 6,
    name: "Nivelul 6",
    background: require("../assets/levele/level1.png"),
    duration: 40,
    spawnRate: 800,
    speed: 320,
    thornChance: 0.16,
    position: { x: "60%", y: "58%" },
    iconUnlocked: require("../assets/levele/rodie.png"),
    iconLocked: require("../assets/levele/rodieLacat.png"),
  },
  {
    id: 7,
    name: "Nivelul 7",
    background: require("../assets/levele/level1.png"),
    duration: 45,
    spawnRate: 750,
    speed: 330,
    thornChance: 0.18,
    position: { x: "40%", y: "52%" },
    iconUnlocked: require("../assets/levele/ananas.png"),
    iconLocked: require("../assets/levele/ananasLacat.png"),
  },
  {
    id: 8,
    name: "Nivelul 8",
    background: require("../assets/levele/level1.png"),
    duration: 45,
    spawnRate: 700,
    speed: 340,
    thornChance: 0.20,
    position: { x: "58%", y: "46%" },
    iconUnlocked: require("../assets/levele/strugure.png"),
    iconLocked: require("../assets/levele/strugureLacat.png"),
  },
  {
    id: 9,
    name: "Nivelul 9",
    background: require("../assets/levele/level1.png"),
    duration: 50,
    spawnRate: 650,
    speed: 350,
    thornChance: 0.22,
    position: { x: "73%", y: "40%" },
    iconUnlocked: require("../assets/levele/para.png"),
    iconLocked: require("../assets/levele/paraLacat.png"),
  },
  {
    id: 10,
    name: "Nivelul 10",
    background: require("../assets/levele/level1.png"),
    duration: 50,
    spawnRate: 600,
    speed: 360,
    thornChance: 0.24,
    position: { x: "58%", y: "37%" },
    iconUnlocked: require("../assets/levele/grau.png"),
    iconLocked: require("../assets/levele/grauLacat.png"),
  },
  {
    id: 11,
    name: "Nivelul 11",
    background: require("../assets/levele/level1.png"),
    duration: 55,
    spawnRate: 550,
    speed: 370,
    thornChance: 0.25,
    position: { x: "38%", y: "32%" },
    iconUnlocked: require("../assets/levele/rodie.png"),
    iconLocked: require("../assets/levele/rodieLacat.png"),
  },
  {
    id: 12,
    name: "Nivelul 12",
    background: require("../assets/levele/level1.png"),
    duration: 60,
    spawnRate: 500,
    speed: 380,
    thornChance: 0.26,
    position: { x: "55.5%", y: "27.3%" },
    iconUnlocked: require("../assets/levele/strugure.png"),
    iconLocked: require("../assets/levele/strugureLacat.png"),
  },
];
