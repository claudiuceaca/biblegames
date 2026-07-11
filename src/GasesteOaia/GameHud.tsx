import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      {/* Am schimbat Image cu ImageBackground ca să poți pune elemente înăuntru */}
      <ImageBackground
        source={require("@/assets/images/oaie/NavbarOaie.png")}
        style={styles.navbar}
        resizeMode="contain" // "contain" menține proporțiile corecte ale bănii de lemn
      >
        {/* Buton Pauză */}
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={onPause}
        />

        {/* Casetă care acoperă textul vechi și afișează Nivelul Dinamic */}
        <TouchableOpacity
          style={styles.levelContainer}
          onPress={onLevels}
          activeOpacity={0.8}
        >
          <Text style={styles.levelText}>NIVEL {level}</Text>
        </TouchableOpacity>

      </ImageBackground>
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
    paddingHorizontal: 20, // Oferă spațiu pe margini pe ecrane mai mici
  },

  navbar: {
    width: "100%",
    height: 70,
    flexDirection: "row", // Aliniază elementele intern pe orizontală
    alignItems: "center",
  },

  pauseButton: {
    position: "absolute",
    left: "3.5%", // Folosim procente ca butonul să pice mereu pe cercul verde, indiferent de ecran
    width: 50,
    height: 50,
    borderRadius: 25, // Îl face rotund ca să se potrivească pe cercul verde
  },

  levelContainer: {
    position: "absolute",
    left: "18%", // Poziționat procentual exact peste primul chenar alb din imagine
    width: "25%", // Lățimea aproximativă a chenarului alb din imagine
    height: 42,
    borderRadius: 14, // Rotunjirea colțurilor pentru a imita chenarul din spate
    alignItems: "center",
    justifyContent: "center",
    // Adăugăm o mică bordură discretă dacă vrei să se îmbine mai bine cu designul
  },

  levelText: {
    color: "#4A2E16", // Maro închis identic cu cel din jocul tău
    fontSize: 16,
    fontWeight: "900", // Face textul foarte gros (Bold)
    textAlign: "center",
    textTransform: "uppercase",
  },
});
