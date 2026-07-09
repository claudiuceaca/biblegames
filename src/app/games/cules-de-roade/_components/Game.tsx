import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useEffect, useReducer, useRef, useState } from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";

import { LevelConfig } from "../_data/levels";
import {
  gameReducer,
  initialGameState,
} from "../_reducers/gameReducer";

import { router } from "expo-router";
import Controls from "./Controls";
import GameArea from "./GameArea";
import GameHUD from "./GameHUD";
import GameOverOverlay from "./GameOverOverlay";
import PauseOverlay from "./PauseOverlay";
import StartScreen from "./StartScreen";

type GameProps = {
  config: LevelConfig;
};

export default function Game({ config }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const prevHapticGoodRef = useRef(0);
  const prevHapticBadRef = useRef(0);

  // LOGICA SIMPLĂ DE VICTORIE: Să ai vieți și să fi prins măcar un fruct
  const isVictory = state.lives > 0 && state.score > 0;

  useEffect(() => {
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      dispatch({
        type: "TICK",
        delta,
      });
    };

    if (state.phase === "PLAYING") {
      gameLoopRef.current = setInterval(tick, 16);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [state.phase]);

  // Gestionare salvare progres la final de meci
  useEffect(() => {
    if (state.phase === "GAME_OVER") {
      if (state.score > highScore) {
        setHighScore(state.score);
      }

      // Dacă este victorie (timpul a expirat și mai are vieți), deblocăm nivelul următor
      if (isVictory) {
        const unlockNextLevel = async () => {
          try {
            const nextLevelId = config.id + 1;
            const savedLevel = await AsyncStorage.getItem("maxUnlockedLevel");
            const currentMax = savedLevel ? parseInt(savedLevel, 10) : 1;

            if (nextLevelId > currentMax) {
              await AsyncStorage.setItem("maxUnlockedLevel", nextLevelId.toString());
              console.log(`Nivelul ${nextLevelId} deblocat!`);
            }
          } catch (error) {
            console.log("Eroare la salvare:", error);
          }
        };
        unlockNextLevel();
      }
    }
  }, [state.phase, state.score, highScore, isVictory, config.id]);

  useEffect(() => {
    if (Platform.OS === "web") return;

    if (state.hapticGoodCount > prevHapticGoodRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      prevHapticGoodRef.current = state.hapticGoodCount;
    }

    if (state.hapticBadCount > prevHapticBadRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
      prevHapticBadRef.current = state.hapticBadCount;
    }
  }, [state.hapticGoodCount, state.hapticBadCount]);

  const handleStart = (difficulty: "easy" | "medium" | "hard") => {
    dispatch({ type: "START", difficulty });
  };

  const handlePause = () => {
    dispatch({ type: "PAUSE" });
  };

  const handleResume = () => {
    dispatch({ type: "RESUME" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    router.back();
  };

  const handleMoveBasket = (direction: "left" | "right") => {
    dispatch({ type: "MOVE_BASKET", direction });
  };

  const handleSetBasketX = (x: number) => {
    dispatch({ type: "SET_BASKET_X", x });
  };

  const handleLayout = (event: any) => {
    dispatch({
      type: "SET_GAME_AREA_HEIGHT",
      height: event.nativeEvent.layout.height,
    });
  };

  const timeLeftSeconds = Math.ceil(state.timeLeftMs / 1000);

  return (
    <ImageBackground 
      source={config.background} 
      resizeMode="cover" 
      style={styles.container}
    >
      <GameHUD
        score={state.score}
        timeLeftSeconds={timeLeftSeconds}
        lives={state.lives}
        comboMultiplier={state.comboMultiplier}
        streak={state.streak}
        onPause={handlePause}
        onBack={handleReset}
        playing={state.phase === "PLAYING"}
      />

      <GameArea
        fruits={state.fruits}
        basketX={state.basketX}
        basketContents={state.basketContents}
        onLayout={handleLayout}
      />

      {state.isBasketHit && (
        <View style={styles.hitOverlay} />
      )}

      {state.phase === "IDLE" && (
        <StartScreen
          highScore={highScore}
          onStart={handleStart}
        />
      )}

      <PauseOverlay
        visible={state.phase === "PAUSED"}
        onResume={handleResume}
      />

      {/* Transmitem starea isVictory calculată corect */}
      <GameOverOverlay
        visible={state.phase === "GAME_OVER"}
        score={state.score}
        highScore={highScore}
        isNewRecord={state.score > highScore}
        stats={state.stats}
        onStart={handleStart}
        isVictory={isVictory} 
      />

      {state.phase === "PLAYING" && (
        <Controls
          onLeft={() => handleMoveBasket("left")}
          onRight={() => handleMoveBasket("right")}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hitOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,0,0,0.12)",
    zIndex: 100,
  },
});
