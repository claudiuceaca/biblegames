import { ImageBackground } from "expo-image";
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  onPlay: () => void;
};

export default function HomeScreen({ onPlay }: Props) {
  return (
    <ImageBackground
      source={require("@/assets/images/porumbeii/level1.png")}
      style={styles.container}
      contentFit="cover"
    >
      <View style={styles.content}>

        <Image
          source={require("@/assets/images/porumbeii/verset1.png")}
          style={styles.card}
          resizeMode="contain"
        />

        {/* Butonul invizibil peste "Hai să jucăm" */}
        <Pressable
          style={styles.playButton}
          onPress={onPlay}
        />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "92%",
    height: 650,
  },

  playButton: {
    position: "absolute",

    bottom: 110,

    width: 240,
    height: 70,
    borderRadius: 25,
  },
});