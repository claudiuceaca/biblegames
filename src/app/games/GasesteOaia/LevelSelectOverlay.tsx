import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

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
    // Containerul principal ocupă tot ecranul, dar NU este Pressable
    <View style={styles.container}>
      
      {/* 
        1. Fundalul transparent devine un Pressable ABSOLUT. 
        Ocupă tot ecranul în spate și prinde doar click-ul din exterior.
      */}
      <View style={styles.fundalInchidere} />

      {/* 
        2. Meniul cu imaginea este acum un Pressable SEPARAT.
        Nu se mai află în interiorul fundalului de închidere, deci nu mai este afectat de el.
      */}
      <Pressable style={styles.bannerContainer}>
        <View style={styles.bannerContent}>

           <Image
          source={require("@/assets/images/oaie/LevelAlegeOaie.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.levelButton} onPress={onClose}>
          
        </TouchableOpacity>
        </View>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  fundalInchidere: {
    position: "absolute", // Se întinde pe tot ecranul în spatele imaginii
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Culoarea neagră transparentă a overlay-ului
  },
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // Nu are stil de poziție absolută, deci stă deasupra fundalului datorită ordinii de randare
  },
  bannerContent: {
    position: "relative",
    width: "100%",
    height: 285,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%", 
    height: "100%",
  },
  levelButton: {
    position: "absolute",
    top: 50,
    right: 25,
    width: 45,
    height: 45,
  },
});
