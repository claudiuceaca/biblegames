import { useLocalSearchParams } from "expo-router";
import Game from "./_components/Game";
import { LEVELS } from "./_data/levels";

export default function PlayScreen() {
  const { level } = useLocalSearchParams();

  const config =
    LEVELS.find(
      l => l.id === Number(level)
    ) ?? LEVELS[0];

  return (
    <Game
      config={config}
    />
  );
}