import { Image, Pressable, StyleSheet } from "react-native";

type Props = {
  currentLevel: number;
  totalLevels: number;
  onClose: () => void;
  onSelect: (level: number) => void;
};

export default function LevelSelectOverlay({
  currentLevel,
  totalLevels,
  onClose,
  onSelect,
}: Props) {
  return (
    // Folosim Pressable pentru tot fundalul negru semi-transparent
    <Pressable style={styles.container} onPress={onClose}>
      
      {/* 
        FOARTE IMPORTANT: 
        Folosim un Pressable secundar în jurul imaginii cu `onPress={(e) => e.stopPropagation()}`.
        Acesta oprește evenimentul de click să treacă prin imagine. 
        Astfel, dacă apeși PE POPUP, meniul NU se va închide accidental.
      */}
      <Pressable style={styles.bannerContainer} onPress={(e) => e.stopPropagation()}>
        <Image
          source={require("@/assets/images/oaie/LevelAlegeOaie.png")}
          style={styles.image}
          resizeMode="contain"
        />
        
        {/* AICI poți randa ulterior butoanele tale pentru nivele (ex: Nivel 1, Nivel 2) peste imagine */}
      </Pressable>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundal întunecat transparent
    zIndex: 150, // Ne asigurăm că stă deasupra jocului și a HUD-ului
  },
  bannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "85%", // Ocupă 85% din lățime ca să arate bine pe mijloc
    height: "80%",
  },
});
