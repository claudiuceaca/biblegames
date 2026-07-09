import { Pressable, StyleSheet, Text, View } from 'react-native';
import AvoidPanel from './AvoidPanel';
import CollectPanel from './CollectPanel';
import ComboDisplay from './ComboDisplay';
import LivesPanel from './LivesPanel';
import ScorePanel from './ScorePanel';
import TimerPanel from './TimerPanel';

type Props = {
  score: number;
  timeLeftSeconds: number;
  lives: number;
  comboMultiplier: number;
  streak: number;
  onPause: () => void;
  onBack: () => void;
  playing: boolean;
};

export default function GameHUD({
  score,
  timeLeftSeconds,
  lives,
  comboMultiplier,
  streak,
  onPause,
  onBack,
  playing,
}: Props) {
  return (
    <>
      <ScorePanel score={score} />
      <TimerPanel timeLeft={timeLeftSeconds} />
      <LivesPanel lives={lives} />
      <CollectPanel />
      <AvoidPanel />
      <ComboDisplay multiplier={comboMultiplier} streak={streak} />

      <View style={styles.topLeftPanel}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
      </View>

      {playing && (
        <View style={styles.topRightPanel}>
          <Pressable style={styles.pauseButton} onPress={onPause}>
            <Text style={styles.pauseButtonText}>Pauză</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topLeftPanel: {
    position: 'absolute',
    left: 12,
    top: 70,
    zIndex: 1150,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  topRightPanel: {
    position: 'absolute',
    right: 12,
    top: 70,
    zIndex: 50,
  },
  pauseButton: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  pauseButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
