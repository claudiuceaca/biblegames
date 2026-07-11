import { memo } from "react";
import { ImageBackground, StyleSheet } from "react-native";

function AvoidPanel() {
  return (
    <ImageBackground
      source={require("../assets/avoid.png")}
      style={styles.container}
      resizeMode="contain"
    >
      {/* <Text style={styles.panelHeading}>EVITĂ</Text>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Spin.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>-2</Text>
      </View>
      <View style={styles.collectRow}>
        <Text style={styles.rockEmoji}>🪨</Text>
        <Text style={styles.collectText}>-1</Text>
      </View> */}
    </ImageBackground>
  );
}

export default memo(AvoidPanel);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 12,
    top: 205,
    padding: 12,
    borderRadius: 12,
    zIndex: 50,
    width: 120,
    height: 150,
  },
  panelHeading: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  collectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  collectIcon: {
    width: 26,
    height: 26,
  },
  collectText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "800",
    fontSize: 18,
  },
  rockEmoji: {
    fontSize: 16,
  },
});
