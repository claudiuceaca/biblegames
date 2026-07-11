import { memo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  onLeft: () => void;
  onRight: () => void;
};

function Controls({ onLeft, onRight }: Props) {
  return (
    <View style={styles.controlOverlay}>
      <Pressable style={styles.controlArea} onPress={onLeft}>
        <Image
          source={require("../assets/back.png")}
          style={styles.arrowLeft}
        />
      </Pressable>
      <View style={styles.controlSpacer} />
      <Pressable style={styles.controlArea} onPress={onRight}>
        <Image
          source={require("../assets/arrowRight.png")}
          style={styles.arrowLeft}
        />
      </Pressable>
    </View>
  );
}

export default memo(Controls);

const styles = StyleSheet.create({
  controlOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
  },
  controlArea: {
    width: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  controlSpacer: {
    flex: 1,
  },
  arrowButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  controlText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  arrowLeft: {
    width: 50,
    height: 50,
  },
});
