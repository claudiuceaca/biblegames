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
    left: 15,
    top: 10,
    width: 50,
    height: 50,
  },

  levelButton: {
    position: "absolute",
    left: 75,
    top: 13,
    width: 100,
    height: 50,
  },
});