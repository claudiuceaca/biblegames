import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  DimensionValue,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import levels from "./levels/levels";

// Importăm datele din noul folder securizat din afara lui app
export default function GasesteOaiaMapScreen() {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Reîmprospătează harta de fiecare dată când ecranul devine vizibil
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        try {
          const savedLevel = await AsyncStorage.getItem(
            "oaia_maxUnlockedLevel",
          );
          if (savedLevel !== null) {
            setUnlockedLevel(parseInt(savedLevel, 10));
          } else {
            await AsyncStorage.setItem("oaia_maxUnlockedLevel", "1");
            setUnlockedLevel(1);
          }
        } catch (error) {
          console.log("Eroare progres oaie:", error);
        }
      };
      loadProgress();
    }, []),
  );

  const handleResetProgress = async () => {
    try {
      await AsyncStorage.setItem("oaia_maxUnlockedLevel", "1");
      setUnlockedLevel(1);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLevelPress = (levelId: number) => {
    if (levelId > unlockedLevel) return;

    router.push({
      pathname: "/games/gaseste-oaia-pierduta/play",
      params: { levelId: levelId }, // Trimite ID-ul nivelului către ecranul de joc
    });
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setDimensions(e.nativeEvent.layout)}
    >
      <Pressable
        onPress={(e) => {
          if (!dimensions.width) return;
          const pctX = (
            (e.nativeEvent.locationX / dimensions.width) *
            100
          ).toFixed(1);
          const pctY = (
            (e.nativeEvent.locationY / dimensions.height) *
            100
          ).toFixed(1);
          console.log(`position: { x: "${pctX}%", y: "${pctY}%" },`);
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <ImageBackground
          source={require("./_assets/levele/levelsMap.png")}
          resizeMode="cover"
          style={styles.container}
        >
          <Pressable style={styles.backButton} onPress={() => router.back()} />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetProgress}
          >
            <Text style={styles.resetText}>RESET</Text>
          </TouchableOpacity>

          {levels.map((level) => {
            const isUnlocked = level.id <= unlockedLevel;

            return (
              <Pressable
                key={level.id}
                onPress={() => handleLevelPress(level.id)}
                style={[
                  styles.levelButton,
                  {
                    left: level.position.x as DimensionValue,
                    top: level.position.y as DimensionValue,
                    transform: [{ translateX: -40 }, { translateY: -40 }],
                  },
                ]}
              >
                <Image
                  source={isUnlocked ? level.iconUnlocked : level.iconLocked}
                  style={styles.baseImage}
                />
              </Pressable>
            );
          })}
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: "absolute",
    top: 15,
    left: 5,
    width: 60,
    height: 60,
    zIndex: 100,
  },
  resetButton: {
    position: "absolute",
    top: 25,
    right: 15,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    zIndex: 101,
  },
  resetText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  levelButton: {
    position: "absolute",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  baseImage: { width: 80, height: 80, resizeMode: "contain" },
});
