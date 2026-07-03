import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  level: number;
  totalLevels: number;
  onPause: () => void;
  onLevels: () => void;
};

export default function GameHUD({
  level,
  totalLevels,
  onPause,
  onLevels,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/oaie/NavbarOaie.png")}
        style={styles.navbar}
        resizeMode="cover"
      />

      {/* Buton Pauză */}
      <TouchableOpacity
        style={styles.pauseButton}
        onPress={onPause}
      />

      {/* Buton Selectare Nivel */}
      <TouchableOpacity
        style={styles.levelButton}
        onPress={onLevels}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1111,
  },

  navbar: {
    width: "100%",
    height: 70,
  },

  pauseButton: {
    position: "absolute",
    right: 35,
    top: 20,
    width: 55,
    height: 55,
  },

  levelButton: {
    position: "absolute",
    left: 30,
    top: 20,
    width: 140,
    height: 55,
  },
});