import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function StartOverlayOaie({ show, onHide }: { show: boolean; onHide: () => void }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.bannerContainer}>
         <Image
        source={require("@/assets/images/oaie/StartOaie.png")}
        style={styles.banner}
        resizeMode="contain"
      />

      <TouchableOpacity 
      style={styles.startButton}
      onPress={onHide}>
        
      </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  bannerContainer: {
    width: '100%',
    height: 600,
    marginBottom: 15,
    position: 'relative',
  },

  banner: {
    width: '100%',
    height: '100%',
  },

  startButton: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -110 }],
    height: 65,
    width: 220,
    borderRadius: 22.5,
  },
});