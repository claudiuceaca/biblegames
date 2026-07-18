import { Image } from "expo-image";
import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  // momentan hardcodat
  const currentLevel = 12;

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push({
      pathname: "/games/gaseste-oaia-pierduta/play",
      params: {
        level: currentLevel,
      },
    });
  };

  const handleLevels = () => {
    router.push("/games/gaseste-oaia-pierduta/levels");
  };

  return (
    <ImageBackground
      source={require("./_assets/homeScreen.png")}
      resizeMode="cover"
      style={styles.container}
    >
      {/* BACK */}
      <Pressable style={styles.backButton} onPress={handleBack}>
        <Image
          source={require("./_assets/BackOaie.png")}
          style={styles.backButtonImage}
          resizeMode="contain"
        />
      </Pressable>

      {/* CONTINUĂ */}
      <Pressable style={styles.continueButton} onPress={handleContinue} />

      {/* ALEGE NIVELUL */}
      <Pressable style={styles.levelsButton} onPress={handleLevels} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    top: 44,
    left: 18,

    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 22,
  },

  backButtonImage: {
    width: "90%",
    height: "90%",
  },

  continueButton: {
    position: "absolute",

    left: 55,
    right: 55,

    bottom: 140,

    height: 88,
    borderRadius: 24,
  },

  levelsButton: {
    position: "absolute",

    left: 55,
    right: 55,

    bottom: 34,

    height: 88,
    borderRadius: 24,
  },
});
