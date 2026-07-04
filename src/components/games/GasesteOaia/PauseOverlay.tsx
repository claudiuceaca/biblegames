import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  onResume: () => void;
  onLevels: () => void;
};

export default function PauseOverlay({ onResume, onLevels }: Props) {
  return (
    <View style={styles.overlay}>
      {/* Containerul de fundal pentru popup */}
      <View style={styles.bannerContainer}>
        
        {/* Imaginea de fundal a popup-ului */}
        <Image
          source={require("@/assets/images/oaie/PauzaOaie.png")}
          style={styles.banner}
          resizeMode="contain"
        />

        {/* Butonul invizibil poziționat perfect peste cel din imagine */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onResume}
          activeOpacity={0.7}
        />
        <TouchableOpacity 
          style={styles.levelsButton}
          onPress={onLevels}
          activeOpacity={0.7}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundal întunecat transparent (efect de overlay)
    justifyContent: "center", // Centrează pe verticală
    alignItems: "center", // Centrează pe orizontală
    zIndex: 100,
  },
  bannerContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  banner: {
    minWidth: "100%",
    height: undefined, // Permite ca înălțimea să fie calculată automat din raportul de aspect
    aspectRatio: 0.85, // Ajustează valoarea dacă imaginea ta originală este mai lungă sau mai lată
  },
  startButton: {
    position: "absolute",
    top: "41%", // Poziționează butonul în zona inferioară a imaginii tale
    width: "67%", // Se întinde pe lățimea butonului desenat în poză
    height: 100, // Înălțimea zonei de click a butonului
  },
  levelsButton: {
    position: "absolute",
    top: "66%", // Poziționează butonul în zona inferioară a imaginii tale
    width: "65%", // Se întinde pe lățimea butonului desenat în poză
    height: 50, // Înălțimea zonei de click a butonului
  }
  });
