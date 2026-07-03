import * as Haptics from 'expo-haptics';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Controls from './Controls';
import GameArea from './GameArea';
import GameHUD from './GameHUD';
import GameOverOverlay from './GameOverOverlay';
import {
  gameReducer,
  initialGameState
} from './gameReducer';
import PauseOverlay from './PauseOverlay';
import StartScreen from './StartScreen';

type GameProps = {
  onBack?: () => void;
};

export default function Game({ onBack }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const prevHapticGoodRef = useRef(0);
  const prevHapticBadRef = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      dispatch({ type: 'TICK', delta });
    };

    if (state.phase === 'PLAYING') {
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

  useEffect(() => {
    if (state.phase === 'GAME_OVER' && state.score > highScore) {
      setHighScore(state.score);
    }
  }, [state.phase, state.score, highScore]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      if (state.hapticGoodCount > prevHapticGoodRef.current) {
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        } catch (e) {}
        prevHapticGoodRef.current = state.hapticGoodCount;
      }
      if (state.hapticBadCount > prevHapticBadRef.current) {
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        } catch (e) {}
        prevHapticBadRef.current = state.hapticBadCount;
      }
    }
  }, [state.hapticGoodCount, state.hapticBadCount]);

  const handleStart = (difficulty: 'easy' | 'medium' | 'hard') => {
    dispatch({ type: 'START', difficulty });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  const handleResume = () => {
    dispatch({ type: 'RESUME' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    if (onBack) {
      onBack();
    }
  };

  const handleMoveBasket = (direction: 'left' | 'right') => {
    dispatch({ type: 'MOVE_BASKET', direction });
  };

  const handleSetBasketX = (x: number) => {
    dispatch({ type: 'SET_BASKET_X', x });
  };

  const handleLayout = (event: any) => {
    const height = event.nativeEvent.layout.height;
    dispatch({ type: 'SET_GAME_AREA_HEIGHT', height });
  };

  const timeLeftSeconds = Math.ceil(state.timeLeftMs / 1000);

  return (
    <View style={styles.container}>
      <GameHUD
        score={state.score}
        timeLeftSeconds={timeLeftSeconds}
        lives={state.lives}
        comboMultiplier={state.comboMultiplier}
        streak={state.streak}
        onPause={handlePause}
        onBack={handleReset}
        playing={state.phase === 'PLAYING'}
      />

      <GameArea
        fruits={state.fruits}
        basketX={state.basketX}
        basketContents={state.basketContents}
        onLayout={handleLayout}
      />

      {state.isBasketHit && <View style={styles.hitOverlay} />}

      {state.phase === 'IDLE' && (
        <StartScreen highScore={highScore} onStart={handleStart} />
      )}

      <PauseOverlay visible={state.phase === 'PAUSED'} onResume={handleResume} />

      <GameOverOverlay
        visible={state.phase === 'GAME_OVER'}
        score={state.score}
        highScore={highScore}
        isNewRecord={state.score > highScore}
        stats={state.stats}
        onStart={handleStart}
      />

      {state.phase === 'PLAYING' && (
        <Controls onLeft={() => handleMoveBasket('left')} onRight={() => handleMoveBasket('right')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hitOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.12)',
    zIndex: 100,
  },
});
