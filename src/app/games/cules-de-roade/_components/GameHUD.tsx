import { Image, Pressable, StyleSheet, View } from "react-native";
import AvoidPanel from "./AvoidPanel";
import CollectPanel from "./CollectPanel";
import ComboDisplay from "./ComboDisplay";
import LivesPanel from "./LivesPanel";
import ScorePanel from "./ScorePanel";
import TimerPanel from "./TimerPanel";

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
          <Image
            source={require("../assets/back.png")}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {playing && (
        <View style={styles.topRightPanel}>
          <Pressable style={styles.pauseButton} onPress={onPause}>
            <Image
              source={require("../assets/pause.png")}
              style={styles.pauseButtonIcon}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topLeftPanel: {
    position: "absolute",
    left: 12,
    top: 60,
    zIndex: 1150,
  },
  backButton: {
    width: 63,
    height: 63,
  },
  backButtonIcon: {
    width: "100%",
    height: "100%",
  },
  topRightPanel: {
    position: "absolute",
    right: 12,
    top: 70,
    zIndex: 50,
  },
  pauseButton: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 999,
  },
  pauseButtonIcon: {
    width: 50,
    height: 50,
  },
});
