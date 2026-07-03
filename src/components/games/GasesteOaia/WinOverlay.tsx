import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  onNext: () => void;
};

export default function WinOverlay({ onNext }: Props) {
  return (
    <View style={styles.overlay}>
      {/* Containerul de fundal pentru popup */}
      <View style={styles.bannerContainer}>
        
        {/* Imaginea de fundal a popup-ului */}
        <Image
          source={require("@/assets/images/oaie/WinOaie.png")}
          style={styles.banner}
          resizeMode="contain"
        />

        {/* Butonul invizibil poziționat perfect peste cel din imagine */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onNext}
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
    width: "85%", // Ocupă 85% din lățimea ecranului
    alignItems: "center",
    justifyContent: "center",
    // Am scos fundalul roșu de test pentru a lăsa grafica curată
  },
  banner: {
    width: "90%",
    height: undefined, // Permite ca înălțimea să fie calculată automat din raportul de aspect
    aspectRatio: 0.85, // Ajustează valoarea dacă imaginea ta originală este mai lungă sau mai lată
  },
  startButton: {
    position: "absolute",
    bottom: "7%", // Poziționează butonul în zona inferioară a imaginii tale
    width: "65%", // Se întinde pe lățimea butonului desenat în poză
    height: 50, // Înălțimea zonei de click a butonului
  },
});
