import GasesteOaia from "@/components/games/GasesteOaia/GasesteOaia";
import { StyleSheet, View } from "react-native";

export default function GasesteOaiaScreen() {
  return (
    <View style={styles.safeArea}>
      <GasesteOaia />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative",
  },
  safeArea: {
    flex: 1,
  },
});