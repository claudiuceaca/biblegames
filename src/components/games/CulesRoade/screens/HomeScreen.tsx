import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // aici mai târziu vei lua ultimul level din Supabase
    const currentLevel = 12;

    router.push({
      pathname: "/games/cules-de-roade/game",
      params: {
        level: currentLevel,
      },
    });
  };

  const handleLevels = () => {
    router.push("/games/cules-roade/levels");
  };

  return (
    <ImageBackground
      source={require("../assets/images/HomeBackground.png")}
      resizeMode="cover"
      style={styles.container}
    >
      {/* Back */}
      <Pressable
        style={styles.backButton}
        onPress={handleBack}
      />

      {/* Continua */}
      <Pressable
        style={styles.continueButton}
        onPress={handleContinue}
      />

      {/* Alege nivelul */}
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
    top: 45,
    left: 20,

    width: 55,
    height: 55,
    borderRadius: 30,
  },

  continueButton: {
    position: "absolute",

    left: 60,
    right: 60,

    bottom: 135,

    height: 85,
    borderRadius: 20,
  },

  levelsButton: {
    position: "absolute",

    left: 60,
    right: 60,

    bottom: 30,

    height: 85,
    borderRadius: 20,
  },
});