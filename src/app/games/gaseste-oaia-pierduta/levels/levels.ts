import { ComponentType } from "react";

export interface LevelConfig {
  id: number;
  name: string;
  background: any; // Imaginea de fundal a nivelului unde se caută oaia
  sheep: {
    x: number; // Coordonata X de pe ecran unde se află oaia
    y: number; // Coordonata Y de pe ecran unde se află oaia
    width: number;
    height: number;
  };
  position: {
    // Poziția nivelului pe Harta Jocului (Meniu)
    x: string;
    y: string;
  };
  iconUnlocked: ComponentType<any> | any; // Pictograma din meniu (deblocată)
  iconLocked: ComponentType<any> | any; // Pictograma din meniu (blocată)
}

export const levels: LevelConfig[] = [
  {
    id: 1,
    name: "Nivelul 1",
    background: require("@/assets/images/oaie/Oaie1.png"), // Fundalul jocului
    sheep: {
      x: 328,
      y: 447,
      width: 100,
      height: 100,
    },
    position: { x: "50.0%", y: "86%" },
    iconUnlocked: require("../_assets/levele/unlock.png"),
    iconLocked: require("../_assets/levele/lock.png"),
  },
  {
    id: 2,
    name: "Nivelul 2",
    background: require("@/assets/images/oaie/Oaie2.png"), // Fundalul pentru Nivelul 2
    sheep: {
      x: 150, // Pune aici coordonatele X găsite în consolă pentru nivelul 2
      y: 320, // Pune aici coordonatele Y găsite în consolă pentru nivelul 2
      width: 100,
      height: 100,
    },
    position: { x: "37.0%", y: "76%" },
    iconUnlocked: require("../_assets/levele/unlock.png"),
    iconLocked: require("../_assets/levele/lock.png"),
  },
  {
    id: 3,
    name: "Nivelul 3",
    background: require("@/assets/images/oaie/Oaie3.png"),
    sheep: {
      x: 500,
      y: 280,
      width: 100,
      height: 100,
    },
    position: { x: "54.4%", y: "68.7%" },
    iconUnlocked: require("../_assets/levele/unlock.png"),
    iconLocked: require("../_assets/levele/lock.png"),
  },
  // Repetă modelul pentru restul nivelurilor până la 12...
];

export default levels;
