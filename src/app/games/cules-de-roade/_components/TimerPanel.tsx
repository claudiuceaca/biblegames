import { memo } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";

type Props = { timeLeft: number };

function TimerPanel({ timeLeft }: Props) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bannerTimp.png")}
      resizeMode="contain"
    >
      <Text style={styles.timerText}>
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Text>
    </ImageBackground>
  );
}

export default memo(TimerPanel);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 4,
    left: "34%",
    paddingHorizontal: 12,
    alignItems: "center",
    zIndex: 50,
    width: 120,
    height: 60,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerIcon: {
    fontSize: 25,
    marginRight: 8,
    color: "#fff",
  },
  timerText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 18,
    marginTop: 18,
    marginLeft: 25,
  },
});
