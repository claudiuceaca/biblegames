import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";

export default function DonatiiScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/BackgroundDonatii.png")}
      style={styles.container}
      resizeMode="cover"
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
