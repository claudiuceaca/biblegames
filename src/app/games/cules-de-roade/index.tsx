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
      pathname: "/games/cules-de-roade/play",
      params: {
        level: currentLevel,
      },
    });
  };

  const handleLevels = () => {
    router.push("/games/cules-de-roade/levels");
  };

  return (
    <ImageBackground
      source={require("./assets/HomeScreen.png")}
      resizeMode="cover"
      style={styles.container}
    >
      {/* BACK */}
      <Pressable
        style={styles.backButton}
        onPress={handleBack}
      />

      {/* CONTINUĂ */}
      <Pressable
        style={styles.continueButton}
        onPress={handleContinue}
      />

      {/* ALEGE NIVELUL */}
      <Pressable
        style={styles.levelsButton}
        onPress={handleLevels}
      />
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