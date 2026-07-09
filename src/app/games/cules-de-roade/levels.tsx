import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router"; // 💡 ADĂUGAT: useFocusEffect
import { useCallback, useState } from "react"; // 💡 ADĂUGAT: useCallback
import {
  DimensionValue,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { LEVELS } from "./_data/levels";

export default function LevelMapScreen() {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 💡 MODIFICAT: Înlocuim vechiul useEffect cu useFocusEffect + useCallback
  // Acest bloc de cod va rula AUTOMAT de fiecare dată când te întorci de la joc pe hartă
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        try {
          const savedLevel = await AsyncStorage.getItem("maxUnlockedLevel");
          console.log("🔄 Harta s-a reîmprospătat! Valoare citită:", savedLevel);
          
          if (savedLevel !== null) {
            const parsed = parseInt(savedLevel, 10);
            
            if (parsed > 12 || isNaN(parsed)) {
              await AsyncStorage.setItem("maxUnlockedLevel", "1");
              setUnlockedLevel(1);
            } else {
              setUnlockedLevel(parsed);
            }
          } else {
            await AsyncStorage.setItem("maxUnlockedLevel", "1");
            setUnlockedLevel(1);
          }
        } catch (error) {
          console.log("Eroare la încărcarea progresului local:", error);
        }
      };

      loadProgress();
    }, [])
  );

  const handleResetProgress = async () => {
    try {
      await AsyncStorage.setItem("maxUnlockedLevel", "1");
      setUnlockedLevel(1);
      console.log("Progresul a fost resetat! Doar nivelul 1 este deblocat.");
    } catch (error) {
      console.log("Eroare la resetare:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLevelPress = (levelId: number) => {
    if (levelId > unlockedLevel) return;

    router.push({
      pathname: "/games/cules-de-roade/play",
      params: { level: levelId },
    });
  };

  const handleMapPress = (event: any) => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { locationX, locationY } = event.nativeEvent;
    const pctX = ((locationX / dimensions.width) * 100).toFixed(1);
    const pctY = ((locationY / dimensions.height) * 100).toFixed(1);

    console.log(`position: { x: "${pctX}%", y: "${pctY}%" },`);
  };

  return (
    <View 
      style={styles.container} 
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setDimensions({ width, height });
      }}
    >
      <Pressable 
        onPress={handleMapPress} 
        style={StyleSheet.absoluteFillObject}
      >
        <ImageBackground
          source={require("./assets/LevelsMap.png")}
          resizeMode="cover"
          style={styles.container}
        >
          {/* Back */}
          <Pressable style={styles.backButton} onPress={handleBack} />

          {/* BUTONUL DE RESET pentru teste */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
            <Text style={styles.resetText}>RESET</Text>
          </TouchableOpacity>

          {/* Randează automat toate cele 12 nivele */}
          {LEVELS.map((level) => {
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
                    transform: [{ translateX: -50 }, { translateY: -50 }]
                  },
                ]}
              >
                {isUnlocked ? (
                  <Image 
                    source={level.iconUnlocked} 
                    style={styles.baseImage} 
                  />
                ) : (
                  <Image 
                    source={level.iconLocked} 
                    style={styles.baseImage} 
                  />
                )}
              </Pressable>
            );
          })}
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 100,
  },
  resetButton: {
    position: "absolute",
    top: 25,
    right: 15,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 101,
  },
  resetText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  levelButton: {
    position: "absolute",
    width: 100,   
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  baseImage: {
    position: "absolute",
    width: 80,         
    height: 80,        
    resizeMode: "contain",
  },
});
